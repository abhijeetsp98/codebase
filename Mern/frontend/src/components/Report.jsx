import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Tooltip,
  Circle,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Custom restaurant icon
const restaurantIcon = new L.Icon({
  iconUrl: "/icons/restaurant-logo.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Sample order points
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

// Hardcoded cluster assignments
const clusterAssignments = [0, 0, 1, 1, 0, 1, 2, 2, 1];
const clusterColors = ["#e74c3c", "#3498db", "#2ecc71"];
const centroids = [
  { lat: 51.5052, lng: -0.086 },
  { lat: 51.5065, lng: -0.088 },
  { lat: 51.5025, lng: -0.0815 },
];

// Utility to check if point is near
const isNearby = (lat1, lng1, lat2, lng2, threshold = 0.0015) => {
  const dx = lat1 - lat2;
  const dy = lng1 - lng2;
  return Math.sqrt(dx * dx + dy * dy) <= threshold;
};

// Heatmap Layer
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

// Tooltip on hover near points
const HoverPopup = ({ orderPoints }) => {
  const map = useMap();
  const [hoverInfo, setHoverInfo] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { lat, lng } = e.latlng;
      const nearby = orderPoints.find((pt) =>
        isNearby(lat, lng, pt.lat, pt.lng)
      );
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

// KMeans Cluster Visuals
const KMeansClusterLayer = () => {
  return (
    <>
      {orderPoints.map((point, idx) => (
        <CircleMarker
          key={idx}
          center={[point.lat, point.lng]}
          radius={8}
          pathOptions={{
            color: "#333",
            weight: 1,
            fillColor: clusterColors[clusterAssignments[idx]],
            fillOpacity: 0.8,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            {point.dish} (Cluster {clusterAssignments[idx] + 1})
          </Tooltip>
        </CircleMarker>
      ))}
      {centroids.map((c, i) => (
        <Circle
          key={`centroid-${i}`}
          center={[c.lat, c.lng]}
          radius={20}
          pathOptions={{
            color: clusterColors[i],
            fillColor: clusterColors[i],
            fillOpacity: 0.4,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            Cluster Center {i + 1}
          </Tooltip>
        </Circle>
      ))}
    </>
  );
};

// Cluster summary data
const getClusterData = (assignments, clusterCount) => {
  const counts = Array(clusterCount).fill(0);
  assignments.forEach((c) => counts[c]++);
  return counts.map((count, i) => ({
    cluster: `Cluster ${i + 1}`,
    orders: count,
  }));
};

const Report = () => {
  const restaurantLatLng = [51.5055, -0.0865];
  const clusterData = getClusterData(clusterAssignments, 3);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>
        📍 Order Heatmap Around Bill’s London Bridge
      </h2>

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

        {/* Heatmap, hover tooltip, clusters */}
        <HeatmapLayer points={orderPoints} />
        <HoverPopup orderPoints={orderPoints} />
        <KMeansClusterLayer />
      </MapContainer>

      {/* Cluster Summary Graph */}
      <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>
        📊 Order Distribution by Cluster
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={clusterData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cluster" />
          <YAxis />
          <ReTooltip />
          <Legend />
          <Bar dataKey="orders" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Report;
