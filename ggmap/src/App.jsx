import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import imageMap from "../public/maps.png";

const App = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const containerStyle = {
    width: "100%",
    height: "100vh",
    position: "relative",
  };
  const divStyle = {
    position: "absolute",
    zIndex: 10000,
    top: "150px",
    left: "-33px",
    transform: "rotate(90deg)",
  };
  const mapContainerRef = useRef(null);
  const imageOverlayRef = useRef(null);

  useEffect(() => {
    const defaultCenter = { lat: 21.136663, lng: 105.7473444 };
    const map = L.map(mapContainerRef.current).setView(defaultCenter, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const imageBounds = calculateImageBounds(defaultCenter);

    imageOverlayRef.current = L.imageOverlay(imageMap, imageBounds, {
      opacity: currentValue / 100,
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (imageOverlayRef.current) {
      imageOverlayRef.current.setOpacity(currentValue / 100);
    }
  }, [currentValue]);

  const calculateImageBounds = () => {
    const imageSize = { width: 28, height: 22 }; // Kích thước thực của hình ảnh

    // Xác định các góc của ảnh dựa trên tâm và kích thước
    const southWest = [
      21.123361631185126 - 0.01 * (imageSize.height / 2), // Điều chỉnh theo tỷ lệ thực tế
      105.82798587755316 - 0.01 * (imageSize.width / 2),
    ];
    const northEast = [
      21.123361631185126 + 0.01 * (imageSize.height / 2),
      105.82798587755316 + 0.01 * (imageSize.width / 2),
    ];

    // Trả về bounds của ảnh
    return L.latLngBounds(southWest, northEast);
  };

  return (
    <div style={containerStyle}>
      <div style={divStyle}>
        <input
          type="range"
          defaultValue={0}
          min={0}
          max={100}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      </div>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
};

export default App;
