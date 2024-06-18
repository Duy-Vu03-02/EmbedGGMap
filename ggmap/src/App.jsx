import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import imageMap from "../public/map.png";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const MapOverlay = ({ imageUrl }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const defaultCenter = { lat: 21.136663, lng: 105.7473444 };

    // Tạo bản đồ Leaflet
    const map = L.map(mapContainerRef.current).setView(defaultCenter, 12);

    // Thêm TileLayer (bản đồ cơ sở)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Tạo bounds cho hình ảnh overlay
    const imageBounds = calculateImageBounds(defaultCenter);

    // Thêm ảnh overlay vào bản đồ
    L.imageOverlay(imageMap, imageBounds, { opacity: 0.5 }).addTo(map);

    return () => {
      map.remove(); // Xóa bản đồ khi component bị unmount
    };
  }, []);

  const calculateImageBounds = (center) => {
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

  return <div ref={mapContainerRef} style={containerStyle}></div>;
};

export default MapOverlay;
