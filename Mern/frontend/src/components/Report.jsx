import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

const restaurantIcon = new L.Icon({
  iconUrl: "/icons/restaurant-logo.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const orderPoints = [
  { lat: 51.505, lng: -0.085, dish: "Spaghetti Carbonara" },
  { lat: 51.506, lng: -0.087, dish: "Margherita Pizza" },
  { lat: 51.504, lng: -0.088, dish: "Caesar Salad" },
  { lat: 51.507, lng: -0.084, dish: "Fish and Chips" },
  { lat: 51.5065, lng: -0.086, dish: "Ravioli" },
  { lat: 51.508, lng: -0.089, dish: "Steak Frites" },
  { lat: 51.502, lng: -0.081, dish: "Grilled Chicken" },
  { lat: 51.503, lng: -0.082, dish: "Cheeseburger" },
  { lat: 51.506, lng: -0.09, dish: "Tiramisu" },
];

// Distance calculator (Haversine simplified for short distances)
const isNearby = (lat1, lng1, lat2, lng2, threshold = 0.0015) => {
  const dx = lat1 - lat2;
  const dy = lng1 - lng2;
  return Math.sqrt(dx * dx + dy * dy) <= threshold;
};

// Heatmap Layer Component
const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    const heatData = points.map((p) => [p.lat, p.lng, 1]);
    const heatLayer = L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.2: "blue",
        0.4: "lime",
        0.6: "orange",
        0.8: "red",
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

// Hoverable Text Layer Component
const HoverPopup = ({ orderPoints }) => {
  const map = useMap();
  const [hoverInfo, setHoverInfo] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { lat, lng } = e.latlng;
      const nearby = orderPoints.find((pt) => isNearby(lat, lng, pt.lat, pt.lng));
      if (nearby) {
        setHoverInfo({ lat: nearby.lat, lng: nearby.lng, dish: nearby.dish });
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setHoverInfo(null), 2000);
      } else {
        setHoverInfo(null);
      }
    };

    map.on("mousemove", handleMouseMove);
    return () => {
      map.off("mousemove", handleMouseMove);
    };
  }, [map, orderPoints]);

  return (
    <>
      {hoverInfo && (
        <Marker position={[hoverInfo.lat, hoverInfo.lng]} opacity={0}>
          <Tooltip direction="top" permanent offset={[0, -20]}>
            🍽️ Most Ordered: <strong>{hoverInfo.dish}</strong>
          </Tooltip>
        </Marker>
      )}
    </>
  );
};

const Report = () => {
  const restaurantLatLng = [51.5055, -0.0865];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>📍 Order Heatmap Around Bill’s London Bridge</h2>
      <MapContainer
        center={restaurantLatLng}
        zoom={15}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Restaurant Marker */}
        <Marker position={restaurantLatLng} icon={restaurantIcon}>
          <Popup>Bill’s London Bridge Restaurant</Popup>
        </Marker>

        {/* Heatmap */}
        <HeatmapLayer points={orderPoints} />

        {/* Hover popup near heat points */}
        <HoverPopup orderPoints={orderPoints} />
      </MapContainer>
    </div>
  );
};

export default Report;
