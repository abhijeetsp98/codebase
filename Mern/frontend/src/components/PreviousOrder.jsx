import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PreviousOrder = () => {
  const weeklyPredictionData = {
    // (Data remains unchanged)
    "Week 1": [
      { x: 1, dayName: 'Mon', expectedY: 6.0, projectedY: 3.5, wavyBlueLineY: 3.5 },
      { x: 2, dayName: 'Tue', expectedY: 5.8, projectedY: 4.0, wavyBlueLineY: 4.5 },
      { x: 3, dayName: 'Wed', expectedY: 5.5, projectedY: 3.8, wavyBlueLineY: 5.5 },
      { x: 4, dayName: 'Thu', expectedY: 5.3, projectedY: 4.3, wavyBlueLineY: 4.0 },
      { x: 5, dayName: 'Fri', expectedY: 5.0, projectedY: 4.1, wavyBlueLineY: 3.0 },
      { x: 6, dayName: 'Sat', expectedY: 4.8, projectedY: 4.6, wavyBlueLineY: 4.0 },
      { x: 7, dayName: 'Sun', expectedY: 4.5, projectedY: 4.4, wavyBlueLineY: 5.0 },
    ],
    "Week 2": [
      { x: 1, dayName: 'Mon', expectedY: 6.2, projectedY: 3.8, wavyBlueLineY: 4.0 },
      { x: 2, dayName: 'Tue', expectedY: 6.0, projectedY: 4.3, wavyBlueLineY: 5.0 },
      { x: 3, dayName: 'Wed', expectedY: 5.7, projectedY: 4.1, wavyBlueLineY: 3.8 },
      { x: 4, dayName: 'Thu', expectedY: 5.5, projectedY: 4.6, wavyBlueLineY: 4.8 },
      { x: 5, dayName: 'Fri', expectedY: 5.2, projectedY: 4.4, wavyBlueLineY: 5.8 },
      { x: 6, dayName: 'Sat', expectedY: 5.0, projectedY: 4.9, wavyBlueLineY: 4.5 },
      { x: 7, dayName: 'Sun', expectedY: 4.7, projectedY: 4.7, wavyBlueLineY: 3.5 },
    ],
    "Week 3": [
      { x: 1, dayName: 'Mon', expectedY: 5.8, projectedY: 4.0, wavyBlueLineY: 5.0 },
      { x: 2, dayName: 'Tue', expectedY: 5.6, projectedY: 4.5, wavyBlueLineY: 4.0 },
      { x: 3, dayName: 'Wed', expectedY: 5.3, projectedY: 4.3, wavyBlueLineY: 3.0 },
      { x: 4, dayName: 'Thu', expectedY: 5.1, projectedY: 4.8, wavyBlueLineY: 4.0 },
      { x: 5, dayName: 'Fri', expectedY: 4.8, projectedY: 4.6, wavyBlueLineY: 5.0 },
      { x: 6, dayName: 'Sat', expectedY: 4.6, projectedY: 5.1, wavyBlueLineY: 4.5 },
      { x: 7, dayName: 'Sun', expectedY: 4.3, projectedY: 4.9, wavyBlueLineY: 3.5 },
    ],
    "Week 4": [
      { x: 1, dayName: 'Mon', expectedY: 5.5, projectedY: 4.2, wavyBlueLineY: 4.5 },
      { x: 2, dayName: 'Tue', expectedY: 5.3, projectedY: 4.7, wavyBlueLineY: 5.5 },
      { x: 3, dayName: 'Wed', expectedY: 5.0, projectedY: 4.5, wavyBlueLineY: 4.0 },
      { x: 4, dayName: 'Thu', expectedY: 4.8, projectedY: 5.0, wavyBlueLineY: 3.0 },
      { x: 5, dayName: 'Fri', expectedY: 4.5, projectedY: 4.8, wavyBlueLineY: 4.0 },
      { x: 6, dayName: 'Sat', expectedY: 4.3, projectedY: 5.3, wavyBlueLineY: 5.0 },
      { x: 7, dayName: 'Sun', expectedY: 4.0, projectedY: 5.1, wavyBlueLineY: 4.5 },
    ],
  };

  const [currentWeek, setCurrentWeek] = useState("Week 1");
  const data = weeklyPredictionData[currentWeek];
  const weeks = Object.keys(weeklyPredictionData);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        height: '600px',
        padding: '30px',
        background: '#fefefe',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#333',
          fontSize: '24px',
        }}
      >
        📊 Monthly Order Prediction (Week: {currentWeek})
      </h1>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h3 style={{ marginBottom: "10px", fontWeight: '500' }}>Select Week:</h3>
        {weeks.map((week) => (
          <button
            key={week}
            onClick={() => setCurrentWeek(week)}
            style={{
              padding: "10px 18px",
              margin: "0 8px",
              cursor: "pointer",
              backgroundColor: currentWeek === week ? "#007bff" : "#ffffff",
              color: currentWeek === week ? "#ffffff" : "#007bff",
              border: "2px solid #007bff",
              borderRadius: "8px",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            {week}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="dayName"
            label={{ value: "Day", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            domain={[3, 7]}
            ticks={[3, 4, 5, 6, 7]}
            label={{
              value: "Order Value",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: 'middle' },
            }}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="wavyBlueLineY"
            stroke="#4682B4"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
            name="Wavy Trend"
          />
          <Line
            type="monotone"
            dataKey="expectedY"
            stroke="#FF0000"
            strokeWidth={3}
            dot={false}
            name="Expected"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="projectedY"
            stroke="#FFA500"
            strokeWidth={3}
            dot={false}
            name="Projected"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PreviousOrder;
