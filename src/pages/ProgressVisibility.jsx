import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ProgressVisibility() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get rewards data from navigation state or localStorage
  const [rewardsData, setRewardsData] = useState([]);
  
  useEffect(() => {
    // Try to get rewards data from navigation state first
    if (location.state && location.state.rewards) {
      setRewardsData(location.state.rewards);
    } else {
      // Fallback: try to get from localStorage or simulate data
      const storedRewards = localStorage.getItem('campaignRewards');
      if (storedRewards) {
        setRewardsData(JSON.parse(storedRewards));
      }
    }
  }, [location.state]);

  // Check which reward logic types are configured
  const hasMilestoneRewards = rewardsData.some(reward => reward.rewardLogicType === 'Milestone-Based');
  const hasLeaderboardRewards = rewardsData.some(reward => reward.rewardLogicType === 'Leaderboard-Based');

  const [formData, setFormData] = useState({
    dashboardDisplayConfig: {
      salesCounter: {
        enabled: false,
        visibleTo: [],
        showEarnedCount: false,
        showResettingProgress: false
      },
      leaderboard: {
        enabled: false,
        visibleTo: [],
        scope: '',
        topX: 10,
        showOwnRank: false
      },
      heroBanner: {
        enabled: false,
        weekCount: 1,
        visibleTo: [],
        themeNote: ''
      }
    },
    engagementNotes: '',
  });
  const [error, setError] = useState('');

  const handleToggleChange = (section, field) => {
    setFormData(prev => ({
      ...prev,
      dashboardDisplayConfig: {
        ...prev.dashboardDisplayConfig,
        [section]: {
          ...prev.dashboardDisplayConfig[section],
          [field]: !prev.dashboardDisplayConfig[section][field]
        }
      }
    }));
  };

  const handleSelectChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      dashboardDisplayConfig: {
        ...prev.dashboardDisplayConfig,
        [section]: {
          ...prev.dashboardDisplayConfig[section],
          [field]: value
        }
      }
    }));
  };

  const handleVisibilityChange = (section, role, checked) => {
    setFormData(prev => {
      const currentVisibleTo = prev.dashboardDisplayConfig[section].visibleTo;
      let newVisibleTo;
      if (checked) {
        newVisibleTo = [...currentVisibleTo, role];
      } else {
        newVisibleTo = currentVisibleTo.filter(r => r !== role);
      }
      
      return {
        ...prev,
        dashboardDisplayConfig: {
          ...prev.dashboardDisplayConfig,
          [section]: {
            ...prev.dashboardDisplayConfig[section],
            visibleTo: newVisibleTo
          }
        }
      };
    });
  };

  const handleNumberChange = (section, field, value) => {
    const numValue = parseInt(value) || 1;
    setFormData(prev => ({
      ...prev,
      dashboardDisplayConfig: {
        ...prev.dashboardDisplayConfig,
        [section]: {
          ...prev.dashboardDisplayConfig[section],
          [field]: numValue
        }
      }
    }));
  };

  const handleTextChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      dashboardDisplayConfig: {
        ...prev.dashboardDisplayConfig,
        [section]: {
          ...prev.dashboardDisplayConfig[section],
          [field]: value
        }
      }
    }));
  };

  const handleEngagementNotesChange = (e) => {
    setFormData(prev => ({ ...prev, engagementNotes: e.target.value }));
  };

  const validateForm = () => {
    // No required fields for this configuration page
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError('');
    console.log('Progress Visibility & Engagement Options:', formData);
    console.log('Associated Rewards:', rewardsData);
    alert('Campaign Request Submitted Successfully!');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const { dashboardDisplayConfig } = formData;

  return (
    <div className="progress-visibility">
      <div className="progress">Step 4 of 4</div>
      <h2>Progress Visibility & Engagement Options</h2>
      <form onSubmit={handleNext}>
        
        <h3>User Dashboard Display Configuration</h3>
        
        {/* Show configuration summary */}
        <div className="reward-summary">
          <p><strong>Configured Reward Types:</strong></p>
          <ul>
            {rewardsData.map((reward, idx) => (
              <li key={idx}>{reward.rewardName} ({reward.rewardLogicType})</li>
            ))}
          </ul>
        </div>

        {/* Sales Counter Widget - Only show if milestone-based rewards exist */}
        {hasMilestoneRewards && (
          <div className="form-section">
            <h4>📈 Widget 1: Sales Counter</h4>
            <p className="widget-availability">✅ Available (Milestone-Based rewards configured)</p>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={dashboardDisplayConfig.salesCounter.enabled}
                  onChange={() => handleToggleChange('salesCounter', 'enabled')}
                />
                Show Sales Counter Widget
              </label>
            </div>
            
            {dashboardDisplayConfig.salesCounter.enabled && (
              <div className="widget-config">
                <div className="form-group">
                  <label>Visible To:</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={dashboardDisplayConfig.salesCounter.visibleTo.includes('Agent')}
                        onChange={(e) => handleVisibilityChange('salesCounter', 'Agent', e.target.checked)}
                      />
                      Agent
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={dashboardDisplayConfig.salesCounter.visibleTo.includes('Manager')}
                        onChange={(e) => handleVisibilityChange('salesCounter', 'Manager', e.target.checked)}
                      />
                      Manager
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={dashboardDisplayConfig.salesCounter.showEarnedCount}
                      onChange={() => handleToggleChange('salesCounter', 'showEarnedCount')}
                    />
                    Show Earned Count
                  </label>
                  <small>e.g. "Vouchers Earned: 4"</small>
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={dashboardDisplayConfig.salesCounter.showResettingProgress}
                      onChange={() => handleToggleChange('salesCounter', 'showResettingProgress')}
                    />
                    Show Resetting Milestone Progress
                  </label>
                  <small>e.g. "0 of 5" style tracker</small>
                </div>
                <p><em>Note: This widget uses milestone logic already defined earlier — this is only for display settings.</em></p>
              </div>
            )}
          </div>
        )}

        {/* Show unavailable message for Sales Counter if no milestone rewards */}
        {!hasMilestoneRewards && (
          <div className="form-section unavailable">
            <h4>📈 Widget 1: Sales Counter</h4>
            <p className="widget-unavailable">❌ Not Available (No Milestone-Based rewards configured)</p>
            <p><em>To enable this widget, configure at least one Milestone-Based reward in the Reward Structure step.</em></p>
          </div>
        )}

        {/* Leaderboard Widget - Only show if leaderboard-based rewards exist */}
        {hasLeaderboardRewards && (
          <div className="form-section">
            <h4>🏆 Widget 2: Leaderboard</h4>
            <p className="widget-availability">✅ Available (Leaderboard-Based rewards configured)</p>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={dashboardDisplayConfig.leaderboard.enabled}
                  onChange={() => handleToggleChange('leaderboard', 'enabled')}
                />
                Show Leaderboard Widget
              </label>
            </div>
            
            {dashboardDisplayConfig.leaderboard.enabled && (
              <div className="widget-config">
                <div className="form-group">
                  <label>Visible To:</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={dashboardDisplayConfig.leaderboard.visibleTo.includes('Agent')}
                        onChange={(e) => handleVisibilityChange('leaderboard', 'Agent', e.target.checked)}
                      />
                      Agent
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={dashboardDisplayConfig.leaderboard.visibleTo.includes('Manager')}
                        onChange={(e) => handleVisibilityChange('leaderboard', 'Manager', e.target.checked)}
                      />
                      Manager
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Leaderboard Scope:</label>
                  <select
                    value={dashboardDisplayConfig.leaderboard.scope}
                    onChange={(e) => handleSelectChange('leaderboard', 'scope', e.target.value)}
                  >
                    <option value="">Select Scope</option>
                    <option value="agents">Agents Only</option>
                    <option value="managers">Managers Only</option>
                    <option value="store">Store-Level</option>
                    <option value="region">Regional-Level</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Show top X:</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={dashboardDisplayConfig.leaderboard.topX}
                    onChange={(e) => handleNumberChange('leaderboard', 'topX', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={dashboardDisplayConfig.leaderboard.showOwnRank}
                      onChange={() => handleToggleChange('leaderboard', 'showOwnRank')}
                    />
                    Always show user's own rank
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Show unavailable message for Leaderboard if no leaderboard rewards */}
        {!hasLeaderboardRewards && (
          <div className="form-section unavailable">
            <h4>🏆 Widget 2: Leaderboard</h4>
            <p className="widget-unavailable">❌ Not Available (No Leaderboard-Based rewards configured)</p>
            <p><em>To enable this widget, configure at least one Leaderboard-Based reward in the Reward Structure step.</em></p>
          </div>
        )}

        {/* Weekly Hero Banners - Always available */}
        <div className="form-section">
          <h4>📣 Weekly Hero Banners</h4>
          <p className="widget-availability">✅ Always Available</p>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={dashboardDisplayConfig.heroBanner.enabled}
                onChange={() => handleToggleChange('heroBanner', 'enabled')}
              />
              Enable Weekly Campaign Hero Banners
            </label>
          </div>
          
          {dashboardDisplayConfig.heroBanner.enabled && (
            <div className="widget-config">
              <div className="form-group">
                <label>Start Week Reference:</label>
                <p><em>Auto-pulls from campaign start date</em></p>
              </div>
              
              <div className="form-group">
                <label>Number of Weeks to Display:</label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  value={dashboardDisplayConfig.heroBanner.weekCount}
                  onChange={(e) => handleNumberChange('heroBanner', 'weekCount', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Visible To:</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={dashboardDisplayConfig.heroBanner.visibleTo.includes('Agent')}
                      onChange={(e) => handleVisibilityChange('heroBanner', 'Agent', e.target.checked)}
                    />
                    Agent
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={dashboardDisplayConfig.heroBanner.visibleTo.includes('Manager')}
                      onChange={(e) => handleVisibilityChange('heroBanner', 'Manager', e.target.checked)}
                    />
                    Manager
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Messaging Theme (Optional):</label>
                <input
                  type="text"
                  placeholder="e.g. Motivational countdown, weekly push"
                  value={dashboardDisplayConfig.heroBanner.themeNote}
                  onChange={(e) => handleTextChange('heroBanner', 'themeNote', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Engagement Notes (Optional)</label>
          <textarea
            name="engagementNotes"
            placeholder="Additional engagement strategies, special considerations, etc."
            value={formData.engagementNotes}
            onChange={handleEngagementNotesChange}
          />
        </div>

        {error && <div className="form-error">{error}</div>}
        <div className="nav-actions">
          <button type="button" onClick={handleBack}>Back</button>
          <button type="submit">Submit Campaign Request</button>
        </div>
      </form>
    </div>
  );
}

export default ProgressVisibility; 