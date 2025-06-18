import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const reportingCadenceOptions = [
  'Weekly',
  'Final Only',
  'Other',
];

function CampaignDatesTracking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    finalEvaluationDate: '',
    reportingCadence: '',
    otherReportingCadence: '',
    trackingNotes: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.startDate || !formData.endDate) {
      setError('Start and End Dates are required.');
      return false;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError('End Date must not be earlier than Start Date.');
      return false;
    }
    if (!formData.reportingCadence) {
      setError('Reporting Cadence is required.');
      return false;
    }
    if (formData.reportingCadence === 'Other' && !formData.otherReportingCadence.trim()) {
      setError('Please specify the other reporting cadence.');
      return false;
    }
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError('');
    // Save campaign dates data to localStorage for review page
    localStorage.setItem('campaignDates', JSON.stringify(formData));
    // Save to state/context here
    // navigate('/progress-visibility'); // Banked for later
    navigate('/review-campaign');
    console.log('Campaign Dates & Reporting:', formData);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="campaign-dates-tracking">
      <div className="dates-header">
        <div className="progress">Step 3 of 4</div>
        <h2>Campaign Dates & Reporting</h2>
        <p className="section-description">
          Set your campaign timeline and reporting preferences. These dates will determine when rewards are active and how progress is tracked throughout the campaign period.
        </p>
      </div>

      <form onSubmit={handleNext}>
        <div className="dates-content">
          {/* Campaign Timeline Section */}
          <div className="form-section">
            <h3>Campaign Timeline</h3>
            <div className="dates-grid">
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
                <small className="input-hint">
                  When should the campaign begin?
                </small>
              </div>
              
              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
                <small className="input-hint">
                  When should the campaign end?
                </small>
              </div>
              
              <div className="form-group">
                <label>Final Evaluation Date (Optional)</label>
                <input
                  type="date"
                  name="finalEvaluationDate"
                  value={formData.finalEvaluationDate}
                  onChange={handleChange}
                />
                <small className="input-hint">
                  Allow extra time for final calculations and reward distribution
                </small>
              </div>
            </div>
          </div>

          {/* Reporting Configuration Section */}
          <div className="form-section">
            <h3>Reporting Configuration</h3>
            <div className="form-group">
              <label>Reporting Cadence *</label>
              <select
                name="reportingCadence"
                value={formData.reportingCadence}
                onChange={handleChange}
                required
              >
                <option value="">Select Reporting Cadence</option>
                {reportingCadenceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <small className="input-hint">
                How often would you like to receive campaign progress reports?
              </small>
              
              {formData.reportingCadence === 'Other' && (
                <div className="sub-form-group">
                  <textarea
                    name="otherReportingCadence"
                    placeholder="Specify your preferred reporting schedule (e.g., Bi-weekly, Monthly, Custom intervals)"
                    value={formData.otherReportingCadence}
                    onChange={handleChange}
                    required
                    rows="3"
                  />
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>Tracking Notes (Optional)</label>
              <textarea
                name="trackingNotes"
                placeholder="Any special tracking requirements, expected delays, manual data uploads, integration notes, or other considerations for campaign monitoring..."
                value={formData.trackingNotes}
                onChange={handleChange}
                rows="4"
              />
              <small className="input-hint">
                Help us understand any special requirements for tracking this campaign
              </small>
            </div>
          </div>
        </div>

        {error && <div className="form-error">{error}</div>}
        
        <div className="nav-actions">
          <button type="button" onClick={handleBack} className="btn-secondary">
            Back to Rewards
          </button>
          <button type="submit" className="btn-primary">
            Review Campaign
          </button>
        </div>
      </form>
    </div>
  );
}

export default CampaignDatesTracking; 