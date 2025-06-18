import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CampaignObjective() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mainGoal: '',
    successDefinition: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.mainGoal.trim() || !formData.successDefinition.trim()) {
      setError('Both fields are required.');
      return;
    }
    setError('');
    // Save campaign objective data to localStorage for review page
    localStorage.setItem('campaignObjective', JSON.stringify(formData));
    navigate('/reward-structure');
    console.log('Campaign Objective:', formData);
  };

  return (
    <div className="campaign-objective">
      <div className="objective-header">
        <div className="progress">Step 1 of 4</div>
        <h2>Campaign Foundation</h2>
        <p className="section-description">
          Define the core purpose and success criteria for your rewards campaign. This foundation will guide the entire campaign structure and help measure its effectiveness.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="objective-content">
          <div className="form-group">
            <label htmlFor="mainGoal">What's the main goal of this campaign? *</label>
            <textarea
              id="mainGoal"
              name="mainGoal"
              value={formData.mainGoal}
              onChange={handleChange}
              placeholder="Example: Increase customer retention by offering rewards for long-term subscriptions, drive sales of premium devices, or boost team performance in specific product categories..."
              required
              rows="4"
            />
            <small className="input-hint">
              Be specific about what you want to achieve - this will help shape your reward structure
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="successDefinition">What does success look like for you? *</label>
            <textarea
              id="successDefinition"
              name="successDefinition"
              value={formData.successDefinition}
              onChange={handleChange}
              placeholder="Example: A 15% increase in customer retention rate over the next quarter, 50 additional premium device sales per month, or improved team engagement scores..."
              required
              rows="4"
            />
            <small className="input-hint">
              Define measurable outcomes that will indicate your campaign's success
            </small>
          </div>
        </div>

        {error && <div className="form-error">{error}</div>}
        
        <div className="nav-actions">
          <div></div> {/* Empty div for spacing */}
          <button type="submit" className="btn-primary">
            Continue to Rewards
          </button>
        </div>
      </form>
    </div>
  );
}

export default CampaignObjective; 