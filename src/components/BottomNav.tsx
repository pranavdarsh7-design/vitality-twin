import { Home, TrendingUp, Target, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: 'home' | 'insights' | 'quests' | 'profile';
  onTabChange: (tab: 'home' | 'insights' | 'quests' | 'profile') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'insights' as const, label: 'Insights', icon: TrendingUp },
    { id: 'quests' as const, label: 'Quests', icon: Target },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center gap-1 px-4 py-2 transition-colors"
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <Icon
                  className={`w-6 h-6 relative z-10 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-500'
                  }`}
                />
                <span
                  className={`text-xs relative z-10 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-500'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
