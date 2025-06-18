import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampaignObjective from './pages/CampaignObjective';
import RewardStructure from './pages/RewardStructure';
import CampaignDatesTracking from './pages/CampaignDatesTracking';
import ReviewCampaign from './pages/ReviewCampaign';
// import ProgressVisibility from './pages/ProgressVisibility'; // Banked for later

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<CampaignObjective />} />
          <Route path="/reward-structure" element={<RewardStructure />} />
          <Route path="/campaign-dates" element={<CampaignDatesTracking />} />
          <Route path="/review-campaign" element={<ReviewCampaign />} />
          {/* <Route path="/progress-visibility" element={<ProgressVisibility />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; 