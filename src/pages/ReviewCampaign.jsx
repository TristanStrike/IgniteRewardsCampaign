import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewCampaign() {
  const navigate = useNavigate();
  const [campaignObjective, setCampaignObjective] = useState(null);
  const [campaignRewards, setCampaignRewards] = useState([]);
  const [campaignDates, setCampaignDates] = useState(null);

  useEffect(() => {
    // Load data from localStorage
    const objectiveData = localStorage.getItem('campaignObjective');
    const rewardsData = localStorage.getItem('campaignRewards');
    const datesData = localStorage.getItem('campaignDates');

    if (objectiveData) {
      setCampaignObjective(JSON.parse(objectiveData));
    }
    if (rewardsData) {
      setCampaignRewards(JSON.parse(rewardsData));
    }
    if (datesData) {
      setCampaignDates(JSON.parse(datesData));
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitting campaign request...');
    alert('Campaign request submitted successfully!');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderMilestoneDetails = (reward) => {
    if (reward.milestoneTrigger?.type === 'repeating') {
      return `Every ${reward.milestoneTrigger.interval} sales`;
    } else if (reward.milestoneTrigger?.milestones?.length > 0) {
      const milestones = reward.milestoneTrigger.milestones;
      if (milestones.length <= 3) {
        return `Milestones: ${milestones.join(', ')}`;
      } else {
        return `${milestones.length} milestones (${milestones[0]} to ${milestones[milestones.length - 1]})`;
      }
    }
    return 'Not configured';
  };

  const renderLogicSpecificDetails = (reward) => {
    switch (reward.rewardLogicType) {
      case 'Leaderboard-Based':
        return (
          <div className="logic-details">
            <div className="detail-item">
              <span className="detail-label">Scope:</span>
              <span className="detail-value">{reward.leaderboardScope || 'Not specified'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Top Performers:</span>
              <span className="detail-value">{reward.topPerformers || 'Not specified'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Evaluation:</span>
              <span className="detail-value">{reward.evaluationPeriod || 'Not specified'}</span>
            </div>
          </div>
        );
      case 'Store/Team-Based':
        return (
          <div className="logic-details">
            <div className="detail-item">
              <span className="detail-label">Metric:</span>
              <span className="detail-value">{reward.teamMetric || 'Not specified'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Threshold:</span>
              <span className="detail-value">{reward.targetThreshold || 'Not specified'}</span>
            </div>
          </div>
        );
      case 'Most Improved':
        return (
          <div className="logic-details">
            <div className="detail-item">
              <span className="detail-label">Comparison Period:</span>
              <span className="detail-value">{reward.comparisonPeriod || 'Not specified'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Min Improvement:</span>
              <span className="detail-value">{reward.minImprovement ? `${reward.minImprovement}%` : 'Not specified'}</span>
            </div>
          </div>
        );
      case 'Custom Logic':
        return (
          <div className="logic-details">
            <div className="detail-item">
              <span className="detail-label">Custom Details:</span>
              <span className="detail-value custom-text">{reward.customLogicDetails || 'Not specified'}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="review-campaign">
      <div className="review-header">
        <div className="progress">Step 4 of 4</div>
        <h2>Review Campaign Request</h2>
        <p className="review-subtitle">
          Please review all campaign details below before submitting your request. This summary will be sent to the campaign management team for approval.
        </p>
      </div>

      <div className="review-sections">
        {/* Campaign Overview Section */}
        <div className="review-card">
          <div className="card-header">
            <h3>Campaign Overview</h3>
            <span className="card-badge">Foundation</span>
          </div>
          <div className="card-content">
            {campaignObjective ? (
              <>
                <div className="summary-row">
                  <div className="summary-label">Main Goal</div>
                  <div className="summary-value">{campaignObjective.mainGoal}</div>
                </div>
                <div className="summary-row">
                  <div className="summary-label">Success Definition</div>
                  <div className="summary-value">{campaignObjective.successDefinition}</div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <div className="empty-text">No campaign objective data found</div>
              </div>
            )}
          </div>
        </div>

        {/* Rewards Structure Section */}
        <div className="review-card">
          <div className="card-header">
            <h3>Rewards Structure</h3>
            <span className="card-badge">{campaignRewards.length} Reward{campaignRewards.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="card-content">
            {campaignRewards.length > 0 ? (
              <div className="rewards-grid">
                {campaignRewards.map((reward, index) => (
                  <div key={index} className="reward-summary-card">
                    <div className="reward-summary-header">
                      <h4>{reward.rewardName}</h4>
                      <span className="reward-type-badge">{reward.rewardLogicType}</span>
                    </div>
                    <div className="reward-summary-content">
                      <div className="summary-row">
                        <div className="summary-label">Eligible Roles</div>
                        <div className="summary-value">{reward.eligibleRoles?.join(', ') || 'Not specified'}</div>
                      </div>
                      <div className="summary-row">
                        <div className="summary-label">Reward Description</div>
                        <div className="summary-value reward-description">{reward.rewardDetails}</div>
                      </div>
                      
                      {reward.rewardLogicType === 'Milestone-Based' && (
                        <div className="milestone-summary">
                          <div className="milestone-summary-header">
                            <h5>Milestone Configuration</h5>
                            <span className="milestone-type-badge">{reward.milestoneTrigger?.type || 'Fixed'}</span>
                          </div>
                          <div className="milestone-details-summary">
                            <div className="milestone-stat">{renderMilestoneDetails(reward)}</div>
                          </div>
                          {reward.badgeBehaviour?.enabled && (
                            <div className="milestone-preview-box">
                              <div className="preview-label">Badge Behaviour</div>
                              <div className="preview-text">{reward.badgeBehaviour.description}</div>
                            </div>
                          )}
                        </div>
                      )}

                      {renderLogicSpecificDetails(reward)}

                      {reward.selectedDeals?.length > 0 && (
                        <div className="deals-summary">
                          <h5>Qualifying Deals</h5>
                          <div className="deals-summary-grid">
                            {reward.selectedDeals.map((deal, dealIndex) => (
                              <div key={dealIndex} className="deal-summary-card">
                                <div className="deal-info">
                                  <div className="deal-brand">{deal.brand}</div>
                                  <div className="deal-model">{deal.model}</div>
                                  <div className="deal-plan">{deal.plan}</div>
                                </div>
                                <div className="deal-id">{deal.dealId}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {reward.limitsNotes && (
                        <div className="summary-row">
                          <div className="summary-label">Limits & Notes</div>
                          <div className="summary-value notes-value">{reward.limitsNotes}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🎁</div>
                <div className="empty-text">No rewards configured</div>
              </div>
            )}
          </div>
        </div>

        {/* Campaign Dates & Reporting Section */}
        <div className="review-card">
          <div className="card-header">
            <h3>Campaign Dates & Reporting</h3>
            <span className="card-badge">Timeline</span>
          </div>
          <div className="card-content">
            {campaignDates ? (
              <>
                <div className="dates-grid">
                  <div className="date-item">
                    <div className="summary-label">Start Date</div>
                    <div className="summary-value date-value">{formatDate(campaignDates.startDate)}</div>
                  </div>
                  <div className="date-item">
                    <div className="summary-label">End Date</div>
                    <div className="summary-value date-value">{formatDate(campaignDates.endDate)}</div>
                  </div>
                  <div className="date-item">
                    <div className="summary-label">Final Evaluation</div>
                    <div className="summary-value date-value">{formatDate(campaignDates.finalEvaluationDate)}</div>
                  </div>
                </div>
                <div className="summary-row">
                  <div className="summary-label">Reporting Cadence</div>
                  <div className="summary-value">
                    {campaignDates.reportingCadence}
                    {campaignDates.reportingCadence === 'Other' && campaignDates.otherReportingCadence && 
                      `: ${campaignDates.otherReportingCadence}`
                    }
                  </div>
                </div>
                {campaignDates.trackingNotes && (
                  <div className="tracking-notes">
                    <div className="summary-label">Tracking Notes</div>
                    <div className="summary-value notes-value">{campaignDates.trackingNotes}</div>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <div className="empty-text">No campaign dates configured</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="review-footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="info-icon">ℹ️</div>
            <div className="info-text">
              Once submitted, this campaign request will be reviewed by our team. You'll receive confirmation and next steps via email within 2-3 business days.
            </div>
          </div>
          <div className="footer-actions">
            <button type="button" onClick={handleBack} className="back-btn">
              Back to Dates
            </button>
            <button type="submit" onClick={handleSubmit} className="submit-btn">
              Submit Campaign Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCampaign; 