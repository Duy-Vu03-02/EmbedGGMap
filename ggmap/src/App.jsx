import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Đảm bảo import CSS của Leaflet

import imageMap from "../public/map.png"; // Đường dẫn đến hình ảnh overlay

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

    // Tạo image overlay
    const imageBounds = [
      [defaultCenter.lat + 0.01 * 10, defaultCenter.lng + 0.01 * 10],
      [defaultCenter.lat - 0.01 * 10, defaultCenter.lng - 0.01 * 10],
    ];
    L.imageOverlay(imageMap, imageBounds).addTo(map);

    return () => {
      map.remove(); // Xóa bản đồ khi component bị unmount
    };
  }, []);

  return <div ref={mapContainerRef} style={containerStyle}></div>;
};

export default MapOverlay;
