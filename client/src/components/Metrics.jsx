import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Metrics(reload) {
  const [metrics, setMetrics] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    hired: 0
  });

  const load = async () => {
    try {
      const res = await API.get('/candidates/metrics/all');
      setMetrics(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, [reload]);

  const cards = [
    { label: "Total Candidates", value: metrics.total, color: "bg-blue-100 text-blue-700" },
    { label: "Pending", value: metrics.pending, color: "bg-yellow-100 text-yellow-700" },
    { label: "Reviewed", value: metrics.reviewed, color: "bg-purple-100 text-purple-700" },
    { label: "Hired", value: metrics.hired, color: "bg-green-100 text-green-700" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {cards.map((item, index) => (
        <div
          key={index}
          className={`p-5 rounded-xl shadow-sm border border-gray-200 ${item.color} transition-all duration-200 hover:shadow-md`}
        >
          <p className="text-sm font-medium">{item.label}</p>
          <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
        </div>
      ))}
    </div>
  );
}
