import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialReward = {
  rewardName: '',
  selectedDeals: [],
  rewardLogicType: '',
  customRewardLogicType: '',
  milestoneTrigger: {
    type: 'fixed',
    interval: 5,
    milestones: [1, 3, 5, 10, 20]
  },
  eligibleRoles: [],
  rewardDetails: '',
  limitsNotes: '',
  badgeBehaviour: {
    enabled: false,
    mode: 'once-off',
    onceOffTiming: '',
    description: '',
  },
  // Leaderboard-Based properties
  leaderboardScope: '',
  topPerformers: '',
  evaluationPeriod: '',
  // Store/Team-Based properties
  teamMetric: '',
  targetThreshold: '',
  // Most Improved properties
  comparisonPeriod: '',
  minImprovement: '',
  // Custom Logic properties
  customLogicDetails: '',
};

const dealOptions = [
  { "Brand": "Samsung", "Model": "Galaxy A14 LTE", "Plan": "FlexOn 1GB", "Deal ID": "TK-SAM-A14-001" },
  { "Brand": "Samsung", "Model": "Galaxy A25 5G", "Plan": "FlexOn 3GB", "Deal ID": "TK-SAM-A25-002" },
  { "Brand": "Samsung", "Model": "Galaxy A34 5G", "Plan": "FlexOn 5GB", "Deal ID": "TK-SAM-A34-003" },
  { "Brand": "Samsung", "Model": "Galaxy A55 5G", "Plan": "FlexOn 6GB", "Deal ID": "TK-SAM-A55-004" },
  { "Brand": "Samsung", "Model": "Galaxy S24 Ultra", "Plan": "FreeMe 20GB", "Deal ID": "TK-SAM-S24U-005" },
  { "Brand": "Samsung", "Model": "Galaxy Z Flip5", "Plan": "FreeMe 30GB", "Deal ID": "TK-SAM-ZF5-006" },
  { "Brand": "iPhone", "Model": "iPhone 11", "Plan": "FreeMe 5GB", "Deal ID": "TK-APP-IP11-007" },
  { "Brand": "iPhone", "Model": "iPhone 13", "Plan": "FreeMe 10GB", "Deal ID": "TK-APP-IP13-008" },
  { "Brand": "iPhone", "Model": "iPhone 14 Pro", "Plan": "FreeMe 30GB", "Deal ID": "TK-APP-IP14-009" },
  { "Brand": "iPhone", "Model": "iPhone 15", "Plan": "FreeMe 40GB", "Deal ID": "TK-APP-IP15-010" },
  { "Brand": "Oppo", "Model": "A58", "Plan": "FlexOn 2GB", "Deal ID": "TK-OPP-A58-011" },
  { "Brand": "Oppo", "Model": "A78", "Plan": "FlexOn 3GB", "Deal ID": "TK-OPP-A78-012" },
  { "Brand": "Oppo", "Model": "Reno10 5G", "Plan": "FlexOn 6GB", "Deal ID": "TK-OPP-R10-013" },
  { "Brand": "Oppo", "Model": "Reno11 Pro", "Plan": "FreeMe 15GB", "Deal ID": "TK-OPP-R11-014" },
  { "Brand": "Oppo", "Model": "Find N2 Flip", "Plan": "FreeMe 20GB", "Deal ID": "TK-OPP-N2F-015" },
  { "Brand": "Honor", "Model": "X5 Plus", "Plan": "FlexOn 1GB", "Deal ID": "TK-HON-X5P-016" },
  { "Brand": "Honor", "Model": "X7B", "Plan": "FlexOn 2GB", "Deal ID": "TK-HON-X7B-017" },
  { "Brand": "Honor", "Model": "90 Lite", "Plan": "FlexOn 4GB", "Deal ID": "TK-HON-90L-018" },
  { "Brand": "Honor", "Model": "Magic5 Lite", "Plan": "FreeMe 10GB", "Deal ID": "TK-HON-M5L-019" },
  { "Brand": "Honor", "Model": "Magic6 Pro", "Plan": "FreeMe 30GB", "Deal ID": "TK-HON-M6P-020" },
  { "Brand": "Nokia", "Model": "C22", "Plan": "FlexOn 1GB", "Deal ID": "TK-NOK-C22-021" },
  { "Brand": "Nokia", "Model": "G22", "Plan": "FlexOn 2GB", "Deal ID": "TK-NOK-G22-022" },
  { "Brand": "Nokia", "Model": "G42", "Plan": "FlexOn 5GB", "Deal ID": "TK-NOK-G42-023" },
  { "Brand": "Motorola", "Model": "E13", "Plan": "FlexOn 1GB", "Deal ID": "TK-MOT-E13-024" },
  { "Brand": "Motorola", "Model": "G13", "Plan": "FlexOn 2GB", "Deal ID": "TK-MOT-G13-025" },
  { "Brand": "Motorola", "Model": "G53 5G", "Plan": "FlexOn 4GB", "Deal ID": "TK-MOT-G53-026" },
  { "Brand": "Huawei", "Model": "Nova Y61", "Plan": "FlexOn 2GB", "Deal ID": "TK-HUA-Y61-027" },
  { "Brand": "Huawei", "Model": "Nova Y72", "Plan": "FlexOn 3GB", "Deal ID": "TK-HUA-Y72-028" },
  { "Brand": "Huawei", "Model": "Nova 11i", "Plan": "FreeMe 10GB", "Deal ID": "TK-HUA-11I-029" },
  { "Brand": "Huawei", "Model": "P60 Pro", "Plan": "FreeMe 30GB", "Deal ID": "TK-HUA-P60-030" },
  { "Brand": "None", "Model": null, "Plan": "FlexOn 1GB – SIM-Only", "Deal ID": "TK-SIM-FLX1-031" },
  { "Brand": "None", "Model": null, "Plan": "FlexOn 3GB – SIM-Only", "Deal ID": "TK-SIM-FLX3-032" },
  { "Brand": "None", "Model": null, "Plan": "FlexOn 5GB – SIM-Only", "Deal ID": "TK-SIM-FLX5-033" },
  { "Brand": "None", "Model": null, "Plan": "SmartBroadband 10GB", "Deal ID": "TK-SIM-SMB10-034" },
  { "Brand": "None", "Model": null, "Plan": "SmartBroadband 20GB", "Deal ID": "TK-SIM-SMB20-035" },
  { "Brand": "None", "Model": null, "Plan": "SmartBroadband 40GB", "Deal ID": "TK-SIM-SMB40-036" },
  { "Brand": "None", "Model": null, "Plan": "SmartBroadband Unlimited", "Deal ID": "TK-SIM-UNLTD-037" },
  { "Brand": "None", "Model": null, "Plan": "LTE 10GB – SIM-Only", "Deal ID": "TK-SIM-LTE10-038" },
  { "Brand": "None", "Model": null, "Plan": "LTE 22.5GB – SIM-Only", "Deal ID": "TK-SIM-LTE225-039" },
  { "Brand": "None", "Model": null, "Plan": "LTE 55GB – SIM-Only", "Deal ID": "TK-SIM-LTE55-040" },
  { "Brand": "None", "Model": null, "Plan": "Prepaid FlexOn 1GB", "Deal ID": "TK-SIM-PPFLX1-041" },
  { "Brand": "None", "Model": null, "Plan": "Prepaid FlexOn 3GB", "Deal ID": "TK-SIM-PPFLX3-042" },
  { "Brand": "None", "Model": null, "Plan": "Prepaid FlexOn 5GB", "Deal ID": "TK-SIM-PPFLX5-043" },
  { "Brand": "None", "Model": null, "Plan": "Prepaid LTE 10GB", "Deal ID": "TK-SIM-PPLTE10-044" },
  { "Brand": "None", "Model": null, "Plan": "Prepaid LTE 20GB", "Deal ID": "TK-SIM-PPLTE20-045" },
  { "Brand": "None", "Model": null, "Plan": "Prepaid LTE 40GB", "Deal ID": "TK-SIM-PPLTE40-046" },
  { "Brand": "None", "Model": null, "Plan": "20GB + 20GB Night Surfer", "Deal ID": "DSF2210031" },
  { "Brand": "None", "Model": null, "Plan": "40GB + 40GB Night Surfer", "Deal ID": "DSF2210033" },
  { "Brand": "None", "Model": null, "Plan": "80GB + 80GB Night Surfer", "Deal ID": "DSF2210041" },
  { "Brand": "None", "Model": null, "Plan": "160GB + 160GB Night Surfer", "Deal ID": "DSF2210043" },
  { "Brand": "None", "Model": null, "Plan": "240GB + 240GB Night Surfer", "Deal ID": "DSF2210045" },
  { "Brand": "None", "Model": null, "Plan": "360GB + 360GB Night Surfer", "Deal ID": "DSF2210047" },
  { "Brand": "None", "Model": null, "Plan": "2TB Anytime Data", "Deal ID": "DSF2210049" },
  { "Brand": "None", "Model": null, "Plan": "Uncapped LTE @10Mbps", "Deal ID": "DSF2210051" },
  { "Brand": "None", "Model": null, "Plan": "Uncapped LTE @20Mbps", "Deal ID": "DSF2210052" },
  { "Brand": "None", "Model": null, "Plan": "LTE 80GB Sim-Only @ R169pm", "Deal ID": "TK-SIM-LTE80-053" },
  { "Brand": "None", "Model": null, "Plan": "LTE 160GB Sim-Only @ R219pm", "Deal ID": "TK-SIM-LTE160-054" },
  { "Brand": "None", "Model": null, "Plan": "LTE 240GB Sim-Only @ R279pm", "Deal ID": "TK-SIM-LTE240-055" },
  { "Brand": "None", "Model": null, "Plan": "LTE 360GB Sim-Only @ R389pm", "Deal ID": "TK-SIM-LTE360-056" },
  { "Brand": "None", "Model": null, "Plan": "LTE 2TB Sim-Only @ R699pm", "Deal ID": "TK-SIM-LTE2TB-057" },
  { "Brand": "None", "Model": null, "Plan": "Uncapped LTE Broadband 10Mbps @ R299pm", "Deal ID": "TK-SIM-ULTE10-058" },
  { "Brand": "None", "Model": null, "Plan": "Uncapped LTE Broadband 20Mbps @ R449pm", "Deal ID": "TK-SIM-ULTE20-059" },
  { "Brand": "None", "Model": null, "Plan": "Uncapped LTE Broadband 30Mbps @ R599pm", "Deal ID": "TK-SIM-ULTE30-060" },
  { "Brand": "None", "Model": null, "Plan": "Prime Video 240GB Sim-Only @ R279pm", "Deal ID": "TK-SIM-PV240-061" }
];

const roleOptions = [
  'Agent',
  'Manager',
  'Store Manager',
  'Cluster Manager',
];

const rewardLogicTypes = [
  'Milestone-Based',
  'Leaderboard-Based',
  'Store/Team-Based',
  'Most Improved',
  'Custom Logic',
];

// Add milestone options constant
const milestoneOptions = [1, 2, 3, 5, 7, 10, 12, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100];
const defaultMilestones = [1, 3, 5, 10, 20];

function RewardStructure() {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState([{ ...initialReward }]);
  const [touched, setTouched] = useState([{}]);
  const [error, setError] = useState('');
  const [dealDropdownOpen, setDealDropdownOpen] = useState({});
  const [dealSearchTerms, setDealSearchTerms] = useState({});
  const [collapsedBrands, setCollapsedBrands] = useState({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.deal-selection-container')) {
        setDealDropdownOpen({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRewardChange = (idx, e) => {
    const { name, value, type, checked } = e.target;
    setRewards(prev => prev.map((reward, i) => {
      if (i !== idx) return reward;
      if (name.startsWith('eligibleRoles')) {
        // Make eligible roles mutually exclusive for all reward types
        return { ...reward, eligibleRoles: [value] };
      }
      if (name === 'rewardLogicType') {
        return { 
          ...reward, 
          rewardLogicType: value, 
          customRewardLogicType: '', 
          eligibleRoles: [],
          badgeBehaviour: { enabled: false, mode: '', description: '' }
        };
      }
      if (name === 'milestoneType') {
        return {
          ...reward,
          milestoneTrigger: {
            ...reward.milestoneTrigger,
            type: value,
            milestones: value === 'fixed' ? defaultMilestones : reward.milestoneTrigger.milestones
          }
        };
      }
      if (name === 'milestoneInterval') {
        const interval = parseInt(value) || 0;
        return {
          ...reward,
          milestoneTrigger: {
            ...reward.milestoneTrigger,
            interval: interval
          }
        };
      }
      if (name === 'nonTangibleToggle') {
        return {
          ...reward,
          badgeBehaviour: {
            ...reward.badgeBehaviour,
            enabled: checked,
            mode: checked ? 'once-off' : '',
            onceOffTiming: checked ? reward.badgeBehaviour.onceOffTiming : '',
            description: checked ? reward.badgeBehaviour.description : '',
          }
        };
      }
      if (name === 'badgeMode') {
        return {
          ...reward,
          badgeBehaviour: {
            ...reward.badgeBehaviour,
            mode: value,
            onceOffTiming: value === 'tiered' ? '' : reward.badgeBehaviour.onceOffTiming,
          }
        };
      }
      if (name === 'onceOffTiming') {
        return {
          ...reward,
          badgeBehaviour: {
            ...reward.badgeBehaviour,
            onceOffTiming: value,
          }
        };
      }
      if (name === 'badgeDescription') {
        return {
          ...reward,
          badgeBehaviour: {
            ...reward.badgeBehaviour,
            description: value,
          }
        };
      }
      return { ...reward, [name]: value };
    }));
  };

  const handleDealSelection = (rewardIdx, deal) => {
    let brand;
    
    if (deal.Brand === 'None' || !deal.Model) {
      // Categorize SIM-only deals into granular segments
      const plan = deal.Plan.toLowerCase();
      
      if (plan.includes('night surfer')) {
        brand = 'Night Surfer Bundles';
      } else if (plan.includes('uncapped')) {
        brand = 'Uncapped LTE Plans';
      } else if (plan.includes('prime video') || plan.includes('anytime data')) {
        brand = 'Promotional Bundles';
      } else {
        brand = 'Standard LTE Monthly Plans';
      }
    } else {
      brand = deal.Brand;
    }

    const formattedDeal = {
      id: deal['Deal ID'],
      brand: brand,
      model: deal.Model || 'N/A',
      plan: deal.Plan,
      dealId: deal['Deal ID']
    };

    setRewards(prev => prev.map((reward, i) => {
      if (i !== rewardIdx) return reward;
      return { 
        ...reward, 
        selectedDeals: [...reward.selectedDeals, formattedDeal] 
      };
    }));

    // Close dropdown after selection
    setDealDropdownOpen(prev => ({ ...prev, [rewardIdx]: false }));
    setDealSearchTerms(prev => ({ ...prev, [rewardIdx]: '' }));
  };

  const handleRemoveDeal = (rewardIdx, dealId) => {
    setRewards(prev => prev.map((reward, i) => {
      if (i !== rewardIdx) return reward;
      return { 
        ...reward, 
        selectedDeals: reward.selectedDeals.filter(deal => deal.id !== dealId) 
      };
    }));
  };

  const handleAddReward = () => {
    setRewards(prev => [...prev, { ...initialReward }]);
    setTouched(prev => [...prev, {}]);
  };

  const handleRemoveReward = (idx) => {
    setRewards(prev => prev.filter((_, i) => i !== idx));
    setTouched(prev => prev.filter((_, i) => i !== idx));
  };

  const handleTouched = (idx, name) => {
    setTouched(prev => prev.map((t, i) => i === idx ? { ...t, [name]: true } : t));
  };

  const validateReward = (reward) => {
    const baseValidation = (
      reward.rewardName.trim() &&
      reward.selectedDeals.length > 0 &&
      reward.rewardLogicType.trim() &&
      (reward.rewardLogicType !== 'Custom Logic' || reward.customRewardLogicType.trim()) &&
      reward.eligibleRoles.length > 0 &&
      reward.rewardDetails.trim()
    );

    // Logic-specific validation
    let logicValidation = true;
    
    switch (reward.rewardLogicType) {
      case 'Milestone-Based':
        const milestoneValidation = reward.milestoneTrigger.type === 'repeating' 
          ? reward.milestoneTrigger.interval > 0
          : reward.milestoneTrigger.milestones && reward.milestoneTrigger.milestones.length >= 3;
        
        if (reward.badgeBehaviour.enabled) {
          const badgeValidation = reward.badgeBehaviour.mode.trim() && reward.badgeBehaviour.description.trim();
          const onceOffValidation = reward.badgeBehaviour.mode !== 'once-off' || reward.badgeBehaviour.onceOffTiming.trim();
          logicValidation = milestoneValidation && badgeValidation && onceOffValidation;
        } else {
          logicValidation = milestoneValidation;
        }
        break;
        
      case 'Leaderboard-Based':
        logicValidation = reward.leaderboardScope.trim() && 
                         reward.topPerformers && 
                         reward.evaluationPeriod.trim();
        break;
        
      case 'Store/Team-Based':
        logicValidation = reward.teamMetric.trim() && reward.targetThreshold;
        break;
        
      case 'Most Improved':
        logicValidation = reward.comparisonPeriod.trim() && reward.minImprovement;
        break;
        
      case 'Custom Logic':
        logicValidation = reward.customLogicDetails.trim();
        break;
        
      default:
        logicValidation = false;
    }

    return baseValidation && logicValidation;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const allValid = rewards.every(validateReward);
    if (!allValid) {
      setError('Please fill in all required fields for each reward and ensure milestone configuration is complete.');
      setTouched(rewards.map(() => ({
        rewardName: true,
        rewardLogicType: true,
        customRewardLogicType: true,
        milestoneTrigger: true,
        eligibleRoles: true,
        rewardDetails: true,
      })));
      return;
    }
    setError('');
    // Save rewards data to localStorage for Progress Visibility page
    localStorage.setItem('campaignRewards', JSON.stringify(rewards));
    // Save to state/context here
    navigate('/campaign-dates', { state: { rewards } });
    console.log('Rewards:', rewards);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getEligibleRoles = (logicType) => {
    switch (logicType) {
      case 'Milestone-Based':
        return ['Agent', 'Store'];
      case 'Leaderboard-Based':
        return ['Agent', 'Manager', 'Store'];
      case 'Store/Team-Based':
        return ['Store Manager', 'Manager'];
      case 'Most Improved':
        return roleOptions;
      case 'Custom Logic':
        return roleOptions;
      default:
        return [];
    }
  };

  const getAvailableDeals = (rewardIdx) => {
    const selectedDealIds = rewards.flatMap(reward => 
      reward.selectedDeals.map(deal => deal['Deal ID'])
    );
    return dealOptions.filter(deal => 
      !selectedDealIds.includes(deal['Deal ID'])
    );
  };

  // Get display name for deal (handles SIM-only fallback)
  const getDealDisplayName = (deal) => {
    if (deal.Brand === 'None' || !deal.Model) {
      return deal.Plan;
    }
    return `${deal.Model} - ${deal.Plan}`;
  };

  // Filter deals based on search term
  const filterDeals = (deals, searchTerm) => {
    if (!searchTerm) return deals;
    const term = searchTerm.toLowerCase();
    return deals.filter(deal => 
      (deal.Model && deal.Model.toLowerCase().includes(term)) ||
      deal.Plan.toLowerCase().includes(term) ||
      deal.Brand.toLowerCase().includes(term)
    );
  };

  // Group deals by brand
  const groupDealsByBrand = (deals) => {
    const grouped = {};
    deals.forEach(deal => {
      let brand;
      
      if (deal.Brand === 'None' || !deal.Model) {
        // Categorize SIM-only deals into granular segments
        const plan = deal.Plan.toLowerCase();
        
        if (plan.includes('night surfer')) {
          brand = 'Night Surfer Bundles';
        } else if (plan.includes('uncapped')) {
          brand = 'Uncapped LTE Plans';
        } else if (plan.includes('prime video') || plan.includes('anytime data')) {
          brand = 'Promotional Bundles';
        } else {
          brand = 'Standard LTE Monthly Plans';
        }
      } else {
        brand = deal.Brand;
      }
      
      if (!grouped[brand]) {
        grouped[brand] = [];
      }
      grouped[brand].push(deal);
    });
    
    // Sort brands: SIM-Only categories first (in specific order), then device brands alphabetically
    const sortedGrouped = {};
    const brands = Object.keys(grouped);
    
    // Define SIM-Only category order
    const simOnlyOrder = [
      'Night Surfer Bundles',
      'Standard LTE Monthly Plans', 
      'Uncapped LTE Plans',
      'Promotional Bundles'
    ];
    
    // Add SIM-Only categories first in the specified order
    simOnlyOrder.forEach(category => {
      if (brands.includes(category)) {
        sortedGrouped[category] = grouped[category];
      }
    });
    
    // Add device brands alphabetically
    brands
      .filter(brand => !simOnlyOrder.includes(brand))
      .sort()
      .forEach(brand => {
        sortedGrouped[brand] = grouped[brand];
      });
    
    return sortedGrouped;
  };

  // Add milestone preview generator
  const getMilestonePreview = (reward) => {
    if (!reward.selectedDeals.length) return '';
    
    const dealName = reward.selectedDeals.length === 1 
      ? reward.selectedDeals[0].name 
      : 'any qualifying deal';
    
    if (reward.milestoneTrigger.type === 'repeating') {
      const interval = reward.milestoneTrigger.interval || 5;
      return `Reward triggers every ${interval} sales of ${dealName}`;
    } else {
      const milestones = reward.milestoneTrigger.milestones || [];
      if (milestones.length === 0) return '';
      
      const ordinalSuffix = (n) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
      };
      
      const ordinalMilestones = milestones.map(m => ordinalSuffix(m));
      
      let milestoneText;
      if (ordinalMilestones.length === 1) {
        milestoneText = ordinalMilestones[0];
      } else if (ordinalMilestones.length === 2) {
        milestoneText = ordinalMilestones.join(' and ');
      } else {
        const lastMilestone = ordinalMilestones.pop();
        milestoneText = ordinalMilestones.join(', ') + ', and ' + lastMilestone;
      }
      
      return `Reward triggers on the ${milestoneText} sale of ${dealName}`;
    }
  };

  // Add milestone toggle handler
  const handleMilestoneToggle = (rewardIdx, milestone) => {
    setRewards(prev => prev.map((reward, i) => {
      if (i !== rewardIdx) return reward;
      
      const currentMilestones = reward.milestoneTrigger.milestones || [];
      const isSelected = currentMilestones.includes(milestone);
      
      let newMilestones;
      if (isSelected) {
        // Only allow deselection if we'll still have at least 3 milestones
        if (currentMilestones.length > 3) {
          newMilestones = currentMilestones.filter(m => m !== milestone);
        } else {
          return reward; // Don't allow deselection
        }
      } else {
        newMilestones = [...currentMilestones, milestone].sort((a, b) => a - b);
      }
      
      return {
        ...reward,
        milestoneTrigger: {
          ...reward.milestoneTrigger,
          milestones: newMilestones
        }
      };
    }));
  };

  return (
    <div className="reward-structure">
      <div className="rewards-header">
        <div className="progress">Step 2 of 4</div>
        <h2>Reward Structure</h2>
        <p className="section-description">
          Configure your campaign rewards by selecting qualifying deals, defining reward logic, and setting milestone triggers. Each reward can target specific roles and include both tangible and non-tangible benefits.
        </p>
      </div>

      <form onSubmit={handleNext}>
        <div className="rewards-content">
          {rewards.map((reward, idx) => (
            <div className="reward-card" key={idx}>
              <div className="reward-header">
                <h3>Reward {idx + 1}</h3>
                {rewards.length > 1 && (
                  <button type="button" className="remove-btn btn-danger btn-sm" onClick={() => handleRemoveReward(idx)}>
                    Remove Reward
                  </button>
                )}
              </div>
              
              {/* Basic Reward Information */}
              <div className="form-section">
                <h4>Basic Information</h4>
                <div className="form-group">
                  <label>Reward Name/Label *</label>
                  <input
                    type="text"
                    name="rewardName"
                    value={reward.rewardName}
                    onChange={e => handleRewardChange(idx, e)}
                    onBlur={() => handleTouched(idx, 'rewardName')}
                    placeholder="e.g., Premium Device Sales Bonus, Customer Retention Reward"
                    required
                  />
                  <small className="input-hint">
                    Give this reward a clear, descriptive name that participants will recognize
                  </small>
                </div>
              </div>

              {/* Deal Selection Section */}
              <div className="form-section">
                <h4>Qualifying Deals</h4>
                <div className="form-group">
                  <label>Select Qualifying Deals *</label>
                  <small className="input-hint">
                    Choose which deals or products will qualify for this reward
                  </small>
                  <div className="deal-selection-container">
                    <div className="deal-selector">
                      <button
                        type="button"
                        className="deal-selector-btn"
                        onClick={() => setDealDropdownOpen(prev => ({ 
                          ...prev, 
                          [idx]: !prev[idx] 
                        }))}
                        disabled={getAvailableDeals(idx).length === 0}
                      >
                        {reward.selectedDeals.length === 0 ? "Select Deal" : "Select Another Deal"}
                        <span className="dropdown-arrow">▼</span>
                      </button>
                      
                      {dealDropdownOpen[idx] && (
                        <div className="deal-dropdown">
                          <div className="deal-search">
                            <input
                              type="text"
                              placeholder="Search deals..."
                              value={dealSearchTerms[idx] || ''}
                              onChange={(e) => setDealSearchTerms(prev => ({
                                ...prev,
                                [idx]: e.target.value
                              }))}
                              className="deal-search-input"
                            />
                          </div>
                          
                          <div className="deal-options">
                            {(() => {
                              const availableDeals = getAvailableDeals(idx);
                              const filteredDeals = filterDeals(availableDeals, dealSearchTerms[idx]);
                              const groupedDeals = groupDealsByBrand(filteredDeals);
                              
                              return Object.keys(groupedDeals).map(brand => (
                                <div key={brand} className="deal-brand-group">
                                  <div 
                                    className="deal-brand-header"
                                    onClick={() => setCollapsedBrands(prev => ({
                                      ...prev,
                                      [`${idx}-${brand}`]: !prev[`${idx}-${brand}`]
                                    }))}
                                  >
                                    <span className="brand-toggle">
                                      {collapsedBrands[`${idx}-${brand}`] ? '▶' : '▼'}
                                    </span>
                                    <strong>{brand}</strong>
                                    <span className="deal-count">({groupedDeals[brand].length})</span>
                                  </div>
                                  
                                  {!collapsedBrands[`${idx}-${brand}`] && (
                                    <div className="deal-brand-items">
                                      {groupedDeals[brand].map(deal => (
                                        <div
                                          key={deal['Deal ID']}
                                          className="deal-option"
                                          onClick={() => handleDealSelection(idx, deal)}
                                        >
                                          <div className="deal-name">{getDealDisplayName(deal)}</div>
                                          <div className="deal-id">{deal['Deal ID']}</div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {reward.selectedDeals.map((deal, dealIdx) => (
                    <div key={deal.id} className="selected-deal">
                      <div className="deal-header">
                        <h4>{['Night Surfer Bundles', 'Standard LTE Monthly Plans', 'Uncapped LTE Plans', 'Promotional Bundles'].includes(deal.brand) ? deal.plan : `${deal.model} - ${deal.plan}`}</h4>
                        <button 
                          type="button" 
                          className="remove-btn" 
                          onClick={() => handleRemoveDeal(idx, deal.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="deal-details">
                        <div className="deal-field">
                          <label>Brand</label>
                          <input type="text" value={deal.brand} readOnly />
                        </div>
                        <div className="deal-field">
                          <label>Model</label>
                          <input type="text" value={deal.model} readOnly />
                        </div>
                        <div className="deal-field">
                          <label>Plan</label>
                          <input type="text" value={deal.plan} readOnly />
                        </div>
                        <div className="deal-field">
                          <label>Deal ID</label>
                          <input type="text" value={deal.dealId} readOnly />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reward Logic Section */}
              <div className="form-section">
                <h4>Reward Logic</h4>
                <div className="form-group">
                  <label>Reward Logic Type *</label>
                  <div className="reward-types">
                    {rewardLogicTypes.map(type => (
                      <label key={type} className="radio-label">
                        <input
                          type="radio"
                          name="rewardLogicType"
                          value={type}
                          checked={reward.rewardLogicType === type}
                          onChange={e => handleRewardChange(idx, e)}
                          onBlur={() => handleTouched(idx, 'rewardLogicType')}
                          required
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                  {reward.rewardLogicType === 'Custom Logic' && (
                    <input
                      type="text"
                      name="customRewardLogicType"
                      placeholder="Describe custom logic type"
                      value={reward.customRewardLogicType}
                      onChange={e => handleRewardChange(idx, e)}
                      onBlur={() => handleTouched(idx, 'customRewardLogicType')}
                      required
                    />
                  )}
                </div>

                {/* Milestone-Based Logic */}
                {reward.rewardLogicType === 'Milestone-Based' && (
                <>
                <div className="form-group">
                  <label>Milestone Logic Type *</label>
                  <div className="reward-types">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="milestoneType"
                        value="repeating"
                        checked={reward.milestoneTrigger.type === 'repeating'}
                        onChange={e => handleRewardChange(idx, e)}
                        onBlur={() => handleTouched(idx, 'milestoneTrigger')}
                        required
                      />
                      Repeating Interval
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="milestoneType"
                        value="fixed"
                        checked={reward.milestoneTrigger.type === 'fixed'}
                        onChange={e => handleRewardChange(idx, e)}
                        onBlur={() => handleTouched(idx, 'milestoneTrigger')}
                        required
                      />
                      Fixed Milestones
                    </label>
                  </div>
                </div>

                {reward.milestoneTrigger.type === 'repeating' && (
                  <div className="form-group">
                    <label>Repeat every ___ sale(s) *</label>
                    <input
                      type="number"
                      name="milestoneInterval"
                      min="1"
                      value={reward.milestoneTrigger.interval || ''}
                      onChange={e => handleRewardChange(idx, e)}
                      onBlur={() => handleTouched(idx, 'milestoneTrigger')}
                      required
                    />
                    {reward.selectedDeals.length > 0 && reward.milestoneTrigger.interval > 0 && (
                      <div className="milestone-preview">
                        {getMilestonePreview(reward)}
                      </div>
                    )}
                  </div>
                )}

                {reward.milestoneTrigger.type === 'fixed' && (
                  <div className="form-group">
                    <label>Select Sales Milestones to Trigger This Reward *</label>
                    <p className="section-description">
                      Choose the key moments when this reward should trigger. Start strong, then scale sensibly. Minimum 3 milestones required.
                    </p>
                    <div className="milestone-toggles">
                      {milestoneOptions.map(milestone => {
                        const isSelected = reward.milestoneTrigger.milestones?.includes(milestone);
                        const canDeselect = !isSelected || (reward.milestoneTrigger.milestones?.length || 0) > 3;
                        return (
                          <button
                            key={milestone}
                            type="button"
                            className={`milestone-toggle ${isSelected ? 'selected' : ''} ${!canDeselect ? 'locked' : ''}`}
                            onClick={() => handleMilestoneToggle(idx, milestone)}
                            disabled={!canDeselect}
                          >
                            {milestone}
                          </button>
                        );
                      })}
                    </div>
                    {reward.selectedDeals.length > 0 && reward.milestoneTrigger.milestones?.length > 0 && (
                      <div className="milestone-preview">
                        {getMilestonePreview(reward)}
                      </div>
                    )}
                  </div>
                )}
                {reward.rewardLogicType === 'Milestone-Based' && (
                  <div className="non-tangible-section">
                    <div className="toggle-container">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          name="nonTangibleToggle"
                          checked={reward.badgeBehaviour.enabled}
                          onChange={e => handleRewardChange(idx, e)}
                        />
                        <span className="toggle-text">Include Non-Tangible Aspect</span>
                      </label>
                    </div>
                    {reward.badgeBehaviour.enabled && (
                      <div className="badge-behaviour-section">
                        <h4>Badge Behaviour</h4>
                        <p className="section-description">
                          Define how badges or other non-tangible rewards should be triggered alongside this milestone-based reward.
                        </p>
                        <div className="badge-mode-selection">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="badgeMode"
                              value="once-off"
                              checked={reward.badgeBehaviour.mode === 'once-off'}
                              onChange={e => handleRewardChange(idx, e)}
                              required
                            />
                            <strong>Once-Off</strong> – Triggered after the first or final milestone is reached
                          </label>
                          {reward.badgeBehaviour.mode === 'once-off' && (
                            <div className="once-off-timing">
                              <label className="checkbox-label sub-option">
                                <input
                                  type="checkbox"
                                  name="onceOffTiming"
                                  value="first"
                                  checked={reward.badgeBehaviour.onceOffTiming === 'first'}
                                  onChange={e => {
                                    // Toggle between first and empty, ensuring mutual exclusivity
                                    const newValue = reward.badgeBehaviour.onceOffTiming === 'first' ? '' : 'first';
                                    handleRewardChange(idx, { target: { name: 'onceOffTiming', value: newValue } });
                                  }}
                                />
                                On First Milestone
                              </label>
                              <label className="checkbox-label sub-option">
                                <input
                                  type="checkbox"
                                  name="onceOffTiming"
                                  value="final"
                                  checked={reward.badgeBehaviour.onceOffTiming === 'final'}
                                  onChange={e => {
                                    // Toggle between final and empty, ensuring mutual exclusivity
                                    const newValue = reward.badgeBehaviour.onceOffTiming === 'final' ? '' : 'final';
                                    handleRewardChange(idx, { target: { name: 'onceOffTiming', value: newValue } });
                                  }}
                                />
                                On Final Milestone
                              </label>
                            </div>
                          )}
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="badgeMode"
                              value="tiered"
                              checked={reward.badgeBehaviour.mode === 'tiered'}
                              onChange={e => handleRewardChange(idx, e)}
                              required
                            />
                            <strong>Tiered</strong> – Mirrors the same milestone thresholds as the main reward
                          </label>
                        </div>
                        <div className="badge-description">
                          <label>Badge Logic Description *</label>
                          <textarea
                            name="badgeDescription"
                            placeholder="e.g. Award bronze badge at 5 sales, silver at 10, gold at 15"
                            value={reward.badgeBehaviour.description}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                </>
                )}
                {/* Leaderboard-Based Logic */}
                {reward.rewardLogicType === 'Leaderboard-Based' && (
                  <>
                    <div className="form-group">
                      <label>Leaderboard Scope *</label>
                      <p className="section-description">
                        Select the competitive scope for this leaderboard-based reward.
                      </p>
                      <div className="reward-types">
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="leaderboardScope"
                            value="store"
                            checked={reward.leaderboardScope === 'store'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Store Level
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="leaderboardScope"
                            value="cluster"
                            checked={reward.leaderboardScope === 'cluster'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Cluster Level
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="leaderboardScope"
                            value="channel"
                            checked={reward.leaderboardScope === 'channel'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Channel Level
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Reward Top Performers *</label>
                      <p className="section-description">
                        How many top performers should receive this reward? (Maximum 500)
                      </p>
                      <div className="number-input-container">
                        <input
                          type="number"
                          name="topPerformers"
                          min="1"
                          max="500"
                          step="1"
                          value={reward.topPerformers || ''}
                          onChange={e => {
                            const value = parseInt(e.target.value);
                            if (value >= 1 && value <= 500) {
                              handleRewardChange(idx, e);
                            } else if (e.target.value === '') {
                              handleRewardChange(idx, e);
                            }
                          }}
                          onKeyDown={e => {
                            // Prevent decimal point, minus sign, and 'e'
                            if (e.key === '.' || e.key === '-' || e.key === 'e' || e.key === 'E') {
                              e.preventDefault();
                            }
                          }}
                          placeholder="3"
                          required
                        />
                        <span className="input-suffix">performers</span>
                      </div>
                      <small className="input-hint">Enter a number between 1 and 500</small>
                    </div>
                    <div className="form-group">
                      <label>Evaluation Period *</label>
                      <p className="section-description">
                        How often should the leaderboard be evaluated and rewards distributed?
                      </p>
                      <div className="reward-types">
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="evaluationPeriod"
                            value="weekly"
                            checked={reward.evaluationPeriod === 'weekly'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Weekly
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="evaluationPeriod"
                            value="monthly"
                            checked={reward.evaluationPeriod === 'monthly'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Monthly
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="evaluationPeriod"
                            value="campaign-end"
                            checked={reward.evaluationPeriod === 'campaign-end'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Campaign End
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* Store/Team-Based Logic */}
                {reward.rewardLogicType === 'Store/Team-Based' && (
                  <>
                    <div className="form-group">
                      <label>Team Performance Metric *</label>
                      <div className="reward-types">
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="teamMetric"
                            value="collective-target"
                            checked={reward.teamMetric === 'collective-target'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Collective Target Achievement
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="teamMetric"
                            value="average-performance"
                            checked={reward.teamMetric === 'average-performance'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Average Team Performance
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="teamMetric"
                            value="participation-rate"
                            checked={reward.teamMetric === 'participation-rate'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Team Participation Rate
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Target Threshold *</label>
                      <input
                        type="number"
                        name="targetThreshold"
                        min="1"
                        value={reward.targetThreshold || ''}
                        onChange={e => handleRewardChange(idx, e)}
                        placeholder="e.g. 50 (sales or percentage)"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Most Improved Logic */}
                {reward.rewardLogicType === 'Most Improved' && (
                  <>
                    <div className="form-group">
                      <label>Comparison Period *</label>
                      <div className="reward-types">
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="comparisonPeriod"
                            value="previous-month"
                            checked={reward.comparisonPeriod === 'previous-month'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Previous Month
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="comparisonPeriod"
                            value="previous-quarter"
                            checked={reward.comparisonPeriod === 'previous-quarter'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Previous Quarter
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            name="comparisonPeriod"
                            value="same-period-last-year"
                            checked={reward.comparisonPeriod === 'same-period-last-year'}
                            onChange={e => handleRewardChange(idx, e)}
                            required
                          />
                          Same Period Last Year
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Minimum Improvement Required *</label>
                      <input
                        type="number"
                        name="minImprovement"
                        min="1"
                        value={reward.minImprovement || ''}
                        onChange={e => handleRewardChange(idx, e)}
                        placeholder="e.g. 25 (percentage improvement)"
                        required
                      />
                      <small>Percentage improvement required to qualify for reward</small>
                    </div>
                  </>
                )}

                {/* Custom Logic */}
                {reward.rewardLogicType === 'Custom Logic' && (
                  <div className="form-group">
                    <label>Custom Logic Details *</label>
                    <textarea
                      name="customLogicDetails"
                      value={reward.customLogicDetails || ''}
                      onChange={e => handleRewardChange(idx, e)}
                      placeholder="Describe the custom logic for this reward in detail..."
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Eligible Roles *</label>
                  <div className="checkbox-group">
                    {getEligibleRoles(reward.rewardLogicType).map(role => (
                      <label key={role} className="checkbox-label">
                        <input
                          type="radio"
                          name={`eligibleRoles-${idx}`}
                          value={role}
                          checked={reward.eligibleRoles[0] === role}
                          onChange={e => handleRewardChange(idx, e)}
                          onBlur={() => handleTouched(idx, 'eligibleRoles')}
                          required={reward.eligibleRoles.length === 0}
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Reward Details *</label>
                  <textarea
                    name="rewardDetails"
                    placeholder="e.g. R75 KFC voucher via SMS"
                    value={reward.rewardDetails}
                    onChange={e => handleRewardChange(idx, e)}
                    onBlur={() => handleTouched(idx, 'rewardDetails')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Limits, Caps, or Notes (optional)</label>
                  <textarea
                    name="limitsNotes"
                    placeholder="e.g. Max 3 rewards per agent per month, resets monthly"
                    value={reward.limitsNotes}
                    onChange={e => handleRewardChange(idx, e)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="reward-actions">
            <button type="button" onClick={handleAddReward} className="add-btn btn-success">
              Add Another Reward
            </button>
          </div>
          {error && <div className="form-error">{error}</div>}
          <div className="nav-actions">
            <button type="button" onClick={handleBack} className="btn-secondary">
              Back to Foundation
            </button>
            <button type="submit" className="btn-primary">
              Continue to Dates
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RewardStructure; 