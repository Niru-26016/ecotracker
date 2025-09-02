import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PodiumDisplay from './components/PodiumDisplay';
import LeaderboardTable from './components/LeaderboardTable';
import FilterSidebar from './components/FilterSidebar';
import CompetitionPanel from './components/CompetitionPanel';
import Icon from '../../components/AppIcon';

const LeaderboardCompetitions = () => {
  const [activeFilter, setActiveFilter] = useState('monthly');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [segmentFilter, setSegmentFilter] = useState('individual');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Mock leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([
    {
      id: 1,
      rank: 1,
      username: 'EcoWarrior_Sarah',
      avatar: '/api/placeholder/40/40',
      totalReduction: 8.7,
      percentageImprovement: 32,
      currentStreak: 45,
      badge: 'Gold Champion',
      location: 'San Francisco',
      category: 'transportation'
    },
    {
      id: 2,
      rank: 2,
      username: 'GreenMike_2024',
      avatar: '/api/placeholder/40/40',
      totalReduction: 7.9,
      percentageImprovement: 28,
      currentStreak: 38,
      badge: 'Silver Star',
      location: 'Portland',
      category: 'energy'
    },
    {
      id: 3,
      rank: 3,
      username: 'CarbonCrusher_Alex',
      avatar: '/api/placeholder/40/40',
      totalReduction: 7.2,
      percentageImprovement: 25,
      currentStreak: 32,
      badge: 'Bronze Hero',
      location: 'Seattle',
      category: 'consumption'
    },
    {
      id: 4,
      rank: 4,
      username: 'SustainableJen',
      avatar: '/api/placeholder/40/40',
      totalReduction: 6.8,
      percentageImprovement: 23,
      currentStreak: 29,
      badge: 'Rising Star',
      location: 'Austin',
      category: 'transportation'
    },
    {
      id: 5,
      rank: 5,
      username: 'CleanEnergyDave',
      avatar: '/api/placeholder/40/40',
      totalReduction: 6.5,
      percentageImprovement: 21,
      currentStreak: 25,
      badge: 'Eco Enthusiast',
      location: 'Denver',
      category: 'energy'
    }
  ]);

  const currentCompetition = {
    title: 'December Carbon Challenge',
    description: 'Reduce your carbon footprint by 20% this month',
    endDate: new Date('2025-01-01'),
    participants: 1247,
    prizes: {
      gold: { title: 'Tesla Model 3 Lease Credit', value: '$5,000', description: '6-month lease credit' },
      silver: { title: 'Solar Panel Installation', value: '$2,500', description: 'Home solar starter kit' },
      bronze: { title: 'Eco Products Bundle', value: '$500', description: 'Sustainable living essentials' }
    }
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLeaderboardData(prevData => 
        prevData?.map(user => ({
          ...user,
          totalReduction: user?.totalReduction + (Math.random() - 0.5) * 0.1,
          currentStreak: Math.max(0, user?.currentStreak + Math.floor(Math.random() * 3 - 1))
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'time':
        setActiveFilter(value);
        break;
      case 'category':
        setCategoryFilter(value);
        break;
      case 'segment':
        setSegmentFilter(value);
        break;
      default:
        break;
    }
  };

  const filteredData = leaderboardData?.filter(user => {
    if (categoryFilter !== 'all' && user?.category !== categoryFilter) return false;
    return true;
  });

  const topThree = filteredData?.slice(0, 3) || [];
  const remainingUsers = filteredData?.slice(3) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 flex items-center space-x-3">
                  <Icon name="Trophy" size={32} className="text-warning" />
                  <span>Leaderboard & Competitions</span>
                </h1>
                <p className="text-muted-foreground">
                  Compete with eco-warriors worldwide and earn amazing prizes for carbon reduction
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-success">Live Rankings</span>
                </div>
                <div className="lg:hidden">
                  <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg text-sm"
                  >
                    <Icon name="Filter" size={16} />
                    <span>Filters</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Mobile Filter Panel */}
            {isMobileFilterOpen && (
              <div className="lg:hidden col-span-full">
                <FilterSidebar
                  activeFilter={activeFilter}
                  categoryFilter={categoryFilter}
                  segmentFilter={segmentFilter}
                  onFilterChange={handleFilterChange}
                  isMobile={true}
                />
              </div>
            )}

            {/* Desktop Left Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <FilterSidebar
                activeFilter={activeFilter}
                categoryFilter={categoryFilter}
                segmentFilter={segmentFilter}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Podium Display */}
              <PodiumDisplay 
                topThree={topThree} 
                competition={currentCompetition}
              />

              {/* Leaderboard Table */}
              <LeaderboardTable 
                users={remainingUsers}
                startingRank={4}
              />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <CompetitionPanel competition={currentCompetition} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardCompetitions;