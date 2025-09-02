import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ChatInterface from './pages/chat-interface';
import Dashboard from './pages/dashboard';
import ReportsAnalytics from './pages/reports-analytics';
import ProfileSettings from './pages/profile-settings';
import ActivityLogging from './pages/activity-logging';
import LeaderboardCompetitions from './pages/leaderboard-competitions';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ActivityLogging />} />
        <Route path="/chat-interface" element={<ChatInterface />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="/leaderboard-competitions" element={<LeaderboardCompetitions />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/activity-logging" element={<ActivityLogging />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;