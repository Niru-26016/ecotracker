import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CompetitionPanel = ({ competition }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!competition?.endDate) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const endDate = new Date(competition?.endDate);
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { days, hours, minutes, seconds };
      }
      
      return null;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [competition?.endDate]);

  if (!competition) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          No Active Competition
        </h3>
        <p className="text-sm text-muted-foreground">
          Stay tuned for upcoming challenges!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Competition */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-environmental sticky top-24">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Icon name="Trophy" size={24} className="text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            {competition?.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {competition?.description}
          </p>
        </div>

        {/* Countdown Timer */}
        {timeLeft && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 text-center">
              Time Remaining
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-muted/50 rounded-lg p-2">
                <div className="text-lg font-bold text-foreground">
                  {timeLeft?.days || 0}
                </div>
                <div className="text-xs text-muted-foreground">Days</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <div className="text-lg font-bold text-foreground">
                  {timeLeft?.hours || 0}
                </div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <div className="text-lg font-bold text-foreground">
                  {timeLeft?.minutes || 0}
                </div>
                <div className="text-xs text-muted-foreground">Minutes</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-2">
                <div className="text-lg font-bold text-foreground">
                  {timeLeft?.seconds || 0}
                </div>
                <div className="text-xs text-muted-foreground">Seconds</div>
              </div>
            </div>
          </div>
        )}

        {/* Participants */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Participants</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {competition?.participants?.toLocaleString() || '0'}
          </div>
        </div>

        {/* Prize Pool */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-semibold text-foreground text-center">
            Prize Pool
          </h3>
          
          {Object.entries(competition?.prizes || {})?.map(([level, prize]) => {
            const getLevelColor = (level) => {
              switch (level) {
                case 'gold': return 'text-yellow-500';
                case 'silver': return 'text-gray-500';
                case 'bronze': return 'text-amber-600';
                default: return 'text-muted-foreground';
              }
            };

            const getLevelIcon = (level) => {
              switch (level) {
                case 'gold': return 'Crown';
                case 'silver': return 'Medal';
                case 'bronze': return 'Award';
                default: return 'Gift';
              }
            };

            return (
              <div key={level} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon name={getLevelIcon(level)} size={16} className={getLevelColor(level)} />
                  <span className="text-sm font-semibold text-foreground capitalize">
                    {level} Prize
                  </span>
                </div>
                <div className="text-lg font-bold text-foreground mb-1">
                  {prize?.value}
                </div>
                <div className="text-sm text-foreground mb-2">
                  {prize?.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {prize?.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Join Competition
          </button>
          <button className="w-full px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors">
            View Rules
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={18} />
          <span>Quick Actions</span>
        </h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group">
            <div className="flex items-center space-x-3">
              <Icon name="Plus" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Log Activity</span>
            </div>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-foreground" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group">
            <div className="flex items-center space-x-3">
              <Icon name="MessageSquare" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Chat Update</span>
            </div>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-foreground" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group">
            <div className="flex items-center space-x-3">
              <Icon name="Share" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Share Progress</span>
            </div>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-foreground" />
          </button>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Award" size={18} />
          <span>Recent Achievements</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
            <Icon name="Leaf" size={16} className="text-success" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Week Streak</div>
              <div className="text-xs text-muted-foreground">7 days of carbon logging</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg">
            <Icon name="Zap" size={16} className="text-warning" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Energy Saver</div>
              <div className="text-xs text-muted-foreground">Reduced energy by 20%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionPanel;