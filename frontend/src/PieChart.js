import React from 'react';

const PieChart = ({ percent }) => {
  const radius = 44;
  const stroke = 12;
  const circ = 2 * Math.PI * radius;
  const arc = circ * (percent / 100);
  return (
    <svg width="120" height="120">
      <circle
        cx="60" cy="60" r={radius}
        stroke="#f0f0f0" strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx="60" cy="60" r={radius}
        stroke="#449afb"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${arc} ${circ - arc}`}
        transform="rotate(-90 60 60)"
        strokeLinecap="round"
      />
      <text
        x="60" y="68"
        textAnchor="middle"
        fontSize="28"
        fontWeight="600"
        fill="#333"
      >{percent}%</text>
    </svg>
  );
};
export default PieChart;
