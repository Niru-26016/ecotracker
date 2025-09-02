import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LeaderboardTable = ({ users, startingRank = 4 }) => {
  const [hoveredUser, setHoveredUser] = useState(null);

  if (!users || users?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          No Rankings Available
        </h3>
        <p className="text-sm text-muted-foreground">
          Check back later for updated rankings
        </p>
      </div>
    );
  }

  const handleShare = (user) => {
    if (navigator?.share) {
      navigator.share({
        title: `Check out ${user?.username}'s carbon reduction achievement!`,
        text: `${user?.username} has reduced their carbon footprint by ${user?.percentageImprovement}% and saved ${user?.totalReduction?.toFixed(1)} tons of CO₂!`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers without native sharing
      const shareText = `${user?.username} has reduced their carbon footprint by ${user?.percentageImprovement}% and saved ${user?.totalReduction?.toFixed(1)} tons of CO₂! 🌱 #CarbonReduction #EcoChallenge`;
      navigator.clipboard?.writeText(shareText);
      // You could show a toast notification here
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-environmental">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground flex items-center space-x-2">
            <Icon name="BarChart3" size={20} />
            <span>Rankings</span>
          </h2>
          <div className="text-sm text-muted-foreground">
            {users?.length} active competitors
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Rank
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                User
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                CO₂ Reduction
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Improvement
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Streak
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users?.map((user, index) => (
              <tr
                key={user?.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredUser(user?.id)}
                onMouseLeave={() => setHoveredUser(null)}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-foreground">
                      #{startingRank + index}
                    </span>
                    {hoveredUser === user?.id && (
                      <Icon name="TrendingUp" size={16} className="text-success animate-pulse" />
                    )}
                  </div>
                </td>
                
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-background overflow-hidden">
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
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {user?.username}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{user?.location}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="text-sm font-semibold text-foreground">
                    {user?.totalReduction?.toFixed(1)} tons
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total saved
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="flex items-center space-x-1">
                    <Icon name="ArrowDown" size={14} className="text-success" />
                    <span className="text-sm font-medium text-success">
                      {user?.percentageImprovement}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    vs baseline
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="Flame" size={14} className="text-warning" />
                    <span className="text-sm font-medium text-foreground">
                      {user?.currentStreak}
                    </span>
                    <span className="text-xs text-muted-foreground">days</span>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleShare(user)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Share achievement"
                    >
                      <Icon name="Share" size={14} className="text-muted-foreground hover:text-foreground" />
                    </button>
                    <button
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="View profile"
                    >
                      <Icon name="Eye" size={14} className="text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden divide-y divide-border">
        {users?.map((user, index) => (
          <div key={user?.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-lg font-bold text-foreground">
                  #{startingRank + index}
                </div>
                <div className="w-10 h-10 rounded-full bg-muted border-2 border-background overflow-hidden">
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
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">
                    {user?.username}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Icon name="MapPin" size={10} />
                    <span>{user?.location}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleShare(user)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="Share" size={16} className="text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {user?.totalReduction?.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">
                  tons saved
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-success">
                  -{user?.percentageImprovement}%
                </div>
                <div className="text-xs text-muted-foreground">
                  improvement
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground flex items-center justify-center space-x-1">
                  <Icon name="Flame" size={12} className="text-warning" />
                  <span>{user?.currentStreak}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  day streak
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="p-6 border-t border-border text-center">
        <button className="px-6 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium text-foreground transition-colors">
          Load More Rankings
        </button>
      </div>
    </div>
  );
};

export default LeaderboardTable;