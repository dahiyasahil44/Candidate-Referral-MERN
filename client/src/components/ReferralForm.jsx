import React, { useState } from 'react';
import API from '../api';

export default function ReferralForm({ onSuccess }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', jobTitle:'' });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = e => {
    const f = e.target.files[0];
    if (f && f.type !== 'application/pdf') {
      setError('Only PDF resumes allowed');
      e.target.value = null;
      return;
    }
    setError('');
    setResume(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.jobTitle) {
      setError('Please fill all required fields');
      return;
    }

    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (resume) data.append('resume', resume);

      const res = await API.post('/candidates', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setForm({ name:'', email:'', phone:'', jobTitle:'' });
      setResume(null);
      setError('');
      onSuccess && onSuccess(res.data);

    } catch (err) {
      setError(err?.response?.data?.error || 'Submission failed');
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mb-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Refer a Candidate</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Candidate Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Job Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Job Title</label>
        <input
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Resume PDF */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Upload Resume (PDF only)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFile}
          className="w-full cursor-pointer text-sm text-gray-700 file:mr-3 file:py-2 file:px-4
                     file:rounded-md file:border-0 file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Refer Candidate
      </button>
    </form>
  );
}
