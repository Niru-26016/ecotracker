import React from 'react';
import Icon from '../../../components/AppIcon';

const PodiumDisplay = ({ topThree, competition }) => {
  const getPodiumHeight = (rank) => {
    switch (rank) {
      case 1: return 'h-32';
      case 2: return 'h-24';
      case 3: return 'h-20';
      default: return 'h-16';
    }
  };

  const getPodiumColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-t from-yellow-400 to-yellow-300';
      case 2: return 'bg-gradient-to-t from-gray-400 to-gray-300';
      case 3: return 'bg-gradient-to-t from-amber-600 to-amber-500';
      default: return 'bg-muted';
    }
  };

  const getBadgeIcon = (rank) => {
    switch (rank) {
      case 1: return 'Crown';
      case 2: return 'Medal';
      case 3: return 'Award';
      default: return 'Star';
    }
  };

  const getBadgeColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-500';
      case 3: return 'text-amber-600';
      default: return 'text-muted-foreground';
    }
  };

  const getPrizeInfo = (rank) => {
    switch (rank) {
      case 1: return competition?.prizes?.gold;
      case 2: return competition?.prizes?.silver;
      case 3: return competition?.prizes?.bronze;
      default: return null;
    }
  };

  if (!topThree || topThree?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Trophy" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          No Champions Yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Be the first to climb the leaderboard!
        </p>
      </div>
    );
  }

  // Arrange for podium display (2nd, 1st, 3rd)
  const podiumOrder = [
    topThree?.find(user => user?.rank === 2),
    topThree?.find(user => user?.rank === 1),
    topThree?.find(user => user?.rank === 3)
  ]?.filter(Boolean);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-environmental">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center space-x-2">
          <Icon name="Trophy" size={24} className="text-warning" />
          <span>Top Champions</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Leading carbon footprint reducers this {competition?.title?.toLowerCase()?.includes('month') ? 'month' : 'period'}
        </p>
      </div>

      {/* Desktop Podium Layout */}
      <div className="hidden md:block">
        <div className="flex items-end justify-center space-x-8 mb-6">
          {podiumOrder?.map((user, index) => {
            if (!user) return null;
            const prize = getPrizeInfo(user?.rank);
            
            return (
              <div key={user?.id} className="text-center group cursor-pointer">
                {/* Prize Badge */}
                {prize && (
                  <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {prize?.title}
                    </div>
                  </div>
                )}
                
                {/* User Avatar */}
                <div className="relative mb-3">
                  <div className="w-20 h-20 rounded-full bg-muted border-4 border-background shadow-lg overflow-hidden">
                    <img
                      src={user?.avatar}
                      alt={user?.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center" style={{display: 'none'}}>
                      <Icon name="User" size={32} className="text-primary" />
                    </div>
                  </div>
                  
                  {/* Rank Badge */}
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${getPodiumColor(user?.rank)} border-2 border-background flex items-center justify-center`}>
                    <Icon name={getBadgeIcon(user?.rank)} size={14} className={getBadgeColor(user?.rank)} />
                  </div>
                </div>

                {/* User Info */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {user?.username}
                  </h3>
                  <div className="space-y-1">
                    <div className="text-xs text-success font-medium">
                      -{user?.percentageImprovement}% CO₂
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user?.totalReduction?.toFixed(1)} tons saved
                    </div>
                  </div>
                </div>

                {/* Podium Base */}
                <div className={`w-24 ${getPodiumHeight(user?.rank)} ${getPodiumColor(user?.rank)} rounded-t-lg border-2 border-background shadow-lg flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-white">
                    {user?.rank}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {topThree?.map((user) => {
          const prize = getPrizeInfo(user?.rank);
          
          return (
            <div key={user?.id} className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className={`w-12 h-12 rounded-full ${getPodiumColor(user?.rank)} flex items-center justify-center shadow-lg`}>
                  <span className="text-lg font-bold text-white">
                    {user?.rank}
                  </span>
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-muted border-2 border-background overflow-hidden">
                  <img
                    src={user?.avatar}
                    alt={user?.username}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center" style={{display: 'none'}}>
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                </div>

                {/* User Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground text-sm">
                      {user?.username}
                    </h3>
                    <Icon name={getBadgeIcon(user?.rank)} size={16} className={getBadgeColor(user?.rank)} />
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="text-success font-medium">
                      -{user?.percentageImprovement}% CO₂
                    </span>
                    <span>
                      {user?.totalReduction?.toFixed(1)} tons
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Flame" size={12} />
                      <span>{user?.currentStreak}d</span>
                    </span>
                  </div>
                  
                  {prize && (
                    <div className="mt-2 text-xs text-primary font-medium">
                      🏆 {prize?.title}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prize Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {Object.entries(competition?.prizes || {})?.map(([level, prize]) => (
            <div key={level} className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs font-medium text-muted-foreground mb-1">
                {level?.toUpperCase()} PRIZE
              </div>
              <div className="text-sm font-semibold text-foreground">
                {prize?.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {prize?.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodiumDisplay;