import React, { useEffect, useState } from 'react';
import API from '../api';
import CandidateCard from './CandidateCard';
import ReferralForm from './ReferralForm';
import Metrics from './Metrics';

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [reloadMetrics, setReloadMetrics] = useState(0);


  const fetchCandidates = async () => {
    try {
      const params = {};
      if (q) params.q = q;
      if (statusFilter) params.status = statusFilter;

      const res = await API.get('/candidates', { params });
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchCandidates(); }, [q, statusFilter]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Candidate Dashboard
      </h1>

      {/* Metrics Section */}
      <Metrics reload={reloadMetrics} />

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">

        {/* Search Input */}
        <input
          placeholder="Search by name, job title, or email"
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option>Pending</option>
          <option>Reviewed</option>
          <option>Hired</option>
        </select>
      </div>

      {/* Referral Form */}
      <ReferralForm onSuccess={() => fetchCandidates()} />

      {/* Candidate List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {candidates.length > 0 ? (
          candidates.map(c => (
            <CandidateCard
              key={c._id}
              candidate={c}
              onUpdated={() => {
                fetchCandidates();
                setReloadMetrics(prev => prev + 1); // ⬅ trigger metrics refresh
              }}
              onDeleted={(id) => {
                setCandidates(prev => prev.filter(x => x._id !== id));
                setReloadMetrics(prev => prev + 1);
              }}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No candidates found.
          </p>
        )}
      </div>
    </div>
  );
}
