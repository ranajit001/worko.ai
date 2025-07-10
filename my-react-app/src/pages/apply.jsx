import React, { useState } from 'react';
import { User, Mail, Phone, Briefcase, Upload, Send, CheckCircle, AlertCircle, FileText, X } from 'lucide-react';
import './apply.css';


import { backApi } from '../utils/backendApi.js';
const JobApplicationForm = () => {



  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactInfo: '',
    jobRole: '',
    // resume: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

//   const handleFileUpload = (file) => {
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         resume: file
//       }));
//     }
//   };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
    //   handleFileUpload(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      resume: null
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
console.log(formData);

    const res = await fetch(`${backApi}/apply`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
                },
        body: JSON.stringify(formData)
    });


      if(res.ok){
              setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        contactInfo: '',
        jobRole: '',
        resume: null
      });
      }
      else{
        setSubmitStatus('error');
      }

    } catch (error) {
      console.log(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const jobRoles = [
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Developer' },
    { value: 'fullstack', label: 'Full Stack Developer' }
  ];

  return (
    <>
      <div className="container">
        <div className="form-container">
          <div className="header">
            <div className="icon-container">
              <Briefcase size={32} color="#6366f1" />
            </div>
            <h1 className="title">Job Application</h1>
            <p className="subtitle">Fill out the form below to apply for a position</p>
          </div>

          {submitStatus === 'success' && (
            <div className="success-message">
              <CheckCircle size={20} color="#10b981" />
              <p> Application submitted successfully!</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="error-message">
              <AlertCircle size={20} color="#ef4444" />
              <p>Failed to submit application. Please try again.</p>
            </div>
          )}

          <div className="form-fields">
            <div className="field-container">
              <label className="label">Full Name *</label>
              <div className="input-container">
                <User size={20} color="#9ca3af" className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="field-container">
              <label className="label">Email Address *</label>
              <div className="input-container">
                <Mail size={20} color="#9ca3af" className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="field-container">
              <label className="label">Contact Information *</label>
              <div className="input-container">
                <Phone size={20} color="#9ca3af" className="input-icon" />
                <input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter your phone number or other contact info"
                />
              </div>
            </div>

            <div className="field-container">
              <label className="label">Job Role *</label>
              <div className="input-container">
                <Briefcase size={20} color="#9ca3af" className="input-icon" />
                <select
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleInputChange}
                  className="select"
                >
                  <option value="">Select a job role</option>
                  {jobRoles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-container">
              <label className="label">Resume Upload</label>
              <div className="upload-container">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInputChange}
                  className="file-input"
                />
                
                {formData.resume ? (
                  <div className="file-display">
                    <FileText size={32} color="#ef4444" />
                    <div className="file-info">
                      <p className="file-name">{formData.resume.name}</p>
                      <p className="file-size">
                        {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={removeFile}
                      className="remove-button"
                      type="button"
                    >
                      <X size={16} color="#6b7280" />
                    </button>
                  </div>
                ) : (
                  <div className="upload-prompt">
                    <Upload size={48} color="#9ca3af" />
                    <p className="upload-text">Click to upload your resume</p>
                    <p className="upload-subtext">PDF files only (Max 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Application
                </>
              )}
            </button>
          </div>

          <div className="footer">
            <p>All fields marked with * are required</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplicationForm;