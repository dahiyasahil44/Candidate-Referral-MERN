import React, { useState } from 'react';
import API from '../api';

export default function CandidateCard({ candidate, onUpdated, onDeleted }) {
  const [status, setStatus] = useState(candidate.status);

  const updateStatus = async (newStatus) => {
    try {
      const res = await API.put(`/candidates/${candidate._id}/status`, { status: newStatus });
      setStatus(res.data.status);
      onUpdated && onUpdated(res.data);
    } catch (err) {
      console.error(err);
      alert('Could not update status');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this candidate?')) return;
    try {
      await API.delete(`/candidates/${candidate._id}`);
      onDeleted && onDeleted(candidate._id);
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all duration-200">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
          <p className="text-sm text-gray-600">{candidate.jobTitle}</p>
        </div>

        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          ✕ Delete
        </button>
      </div>

      {/* Contact Info */}
      <p className="text-gray-700 mt-3 text-sm">
        <span className="font-semibold">Email:</span> {candidate.email}
      </p>
      <p className="text-gray-700 text-sm">
        <span className="font-semibold">Phone:</span> {candidate.phone}
      </p>

      {/* Status */}
      <div className="mt-4">
        <p className="text-sm font-semibold text-gray-800 mb-1">Status</p>

        <select
          value={status}
          onChange={e => updateStatus(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option>Pending</option>
          <option>Reviewed</option>
          <option>Hired</option>
        </select>
      </div>

      {/* Resume */}
      {candidate.resumeUrl && (
        <a
          href={`${import.meta.env.BACKEND_URI}/${candidate.resumeUrl}`}
          target="_blank"
          rel="noreferrer"
          className="block mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          📄 View Resume
        </a>
      )}
    </div>
  );
}
