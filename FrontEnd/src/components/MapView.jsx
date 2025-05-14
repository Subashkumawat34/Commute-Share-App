// components/MapView.js
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "../styles/MapView.module.css";

function MapView() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [34.0522, -118.2437], // Example: Los Angeles coordinates
        zoom: 10,
        layers: [
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      });
    }

    // Add markers, routes, etc. here using leaflet methods
    L.marker([34.0522, -118.2437])
      .addTo(mapRef.current)
      .bindPopup("Los Angeles");

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div  className={styles.map} style={{ height: "500px" }}></div>
  );
}

export default MapView;
