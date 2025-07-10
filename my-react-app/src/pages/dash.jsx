import React, { useState, useEffect } from 'react';
import { Search, Users, CheckCircle, Clock, UserCheck, Filter, Edit3, FileText, Download } from 'lucide-react';
import { backApi } from '../utils/backendApi.js';
import './dashboard.css'

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Unified fetching function
  const fetchCandidates = async (search = '', status = 'All') => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (status && status !== 'All') params.append('status', status.toLowerCase());
      const res = await fetch(`${backApi}/?${params.toString()}`);
      const data = await res.json();
      setCandidates(data.rearchdResult);
    } catch (error) {
      console.log(error);
      
      setCandidates([]);
    }
    setLoading(false);
  };

  // Fetch on mount and when search/status changes
  useEffect(() => {
    fetchCandidates(searchTerm, statusFilter);
  }, [searchTerm, statusFilter]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
      case 'Pending': return <Clock size={16} />;
      case 'reviewed':
      case 'Reviewed': return <UserCheck size={16} />;
      case 'hired':
      case 'Hired': return <CheckCircle size={16} />;
      case 'rejected':
      case 'Rejected': return <Edit3 size={16} />;
      default: return <Users size={16} />;
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${backApi}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      setCandidates(candidates.map(candidate =>
        candidate._id === id ? { ...candidate, status: newStatus } : candidate
      ));
    } catch (error) {
      alert('Error :' + error.message);
    }
  };

  // Delete candidate
  const deleteCandidate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
    try {
      const res = await fetch(`${backApi}/delete/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete candidate');
      setCandidates(candidates.filter(candidate => candidate._id !== id));
    } catch (error) {
      alert('Error deleting candidate: ' + error.message);
    }
  };

  const handleViewResume = (resumeUrl, candidateName) => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    } else {
      alert(`Resume not provided for ${candidateName}`);
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: candidates.length,
    pending: candidates.filter(c => c.status === 'pending').length,
    reviewed: candidates.filter(c => c.status === 'reviewed').length,
    hired: candidates.filter(c => c.status === 'hired').length,
    rejected: candidates.filter(c => c.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div id="dashboard-container" className="dashboard-container">
        <div className="loading-section">
          <div className="spinner"></div>
          <p className="loading-text">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="dashboard-container" className="dashboard-container">
      <div className="main-content">

        {/* Header */}
        <div id="header" className="header">
          <h1 className="header-title">Admin Dashboard</h1>
          <div className="user-info">
            <span className="welcome-text">Welcome, Admin</span>
            <div className="user-avatar">A</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div id="stats-section" className="stats-section">
          <div className="stat-card">
            <div className="stat-icon total-icon">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Candidates</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending-icon">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon reviewed-icon">
              <UserCheck size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.reviewed}</div>
              <div className="stat-label">Reviewed</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon hired-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.hired}</div>
              <div className="stat-label">Hired</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#ffe0e0', color: '#c62828' }}>
              <Edit3 size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-number">{stats.rejected}</div>
              <div className="stat-label">Rejected</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div id="search-filter" className="search-filter">
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input
              id="search-input"
              type="text"
              placeholder="Search by name or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <Filter size={16} className="filter-icon" />
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Candidates List */}
        <div id="candidates-section" className="candidates-section">
          <div className="candidates-header">
            Referred Candidates ({filteredCandidates.length})
          </div>

          {filteredCandidates.map((candidate) => (
            <div key={candidate._id} className="candidate-card">
              <div className="candidate-info">
                <div className="candidate-avatar">
                  {candidate.name.charAt(0)}
                </div>
                <div className="candidate-details">
                  <div className="candidate-name">{candidate.name}</div>
                  <div className="candidate-job">{candidate.jobRole}</div>
                  <div className="candidate-contact">
                    {candidate.email} • {candidate.phone}
                  </div>
                </div>
              </div>

              <div className={`status-badge ${candidate.status?.toLowerCase()}`}>
                {getStatusIcon(candidate.status)}
                {candidate.status}
              </div>

              <div className="candidate-actions">
                <button
                  onClick={() => handleViewResume(candidate.resumeUrl, candidate.name)}
                  className={`resume-btn ${candidate.resumeUrl ? 'has-resume' : 'no-resume'}`}
                >
                  {candidate.resumeUrl ? (
                    <>
                      <Download size={14} />
                      View Resume
                    </>
                  ) : (
                    <>
                      <FileText size={14} />
                      Resume Not Provided
                    </>
                  )}
                </button>

                <select
                  value={candidate.status}
                  onChange={(e) => updateStatus(candidate._id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>

                <button
                  onClick={() => deleteCandidate(candidate._id)}
                  className="resume-btn no-resume"
                  style={{ color: '#c62828', borderColor: '#c62828' }}
                  title="Delete Candidate"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredCandidates.length === 0 && (
            <div className="no-candidates">
              No candidates found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;