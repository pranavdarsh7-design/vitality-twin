import { motion } from 'motion/react';
import { User, FileText, ShoppingBag, Scan, LogOut, Shield, Database, Clock, TrendingUp, Award } from 'lucide-react';
import type { HealthData, Results } from '../App';

interface ProfileScreenProps {
  healthData: HealthData;
  results: Results;
  onNavigate: (destination: 'passport' | 'marketplace' | 'scanner' | 'future') => void;
  onLogout: () => void;
}

export function ProfileScreen({ healthData, results, onNavigate, onLogout }: ProfileScreenProps) {
  const userName = 'Ahmed Al Maktoum';
  const userEmail = 'ahmed.almaktoum@uaepass.ae';
  const memberSince = 'December 2024';

  const quickActions = [
    {
      icon: FileText,
      title: 'Health Passport',
      description: 'DHA & NABIDH sync',
      color: 'from-blue-500 to-cyan-500',
      action: () => onNavigate('passport'),
    },
    {
      icon: ShoppingBag,
      title: 'Vitality Marketplace',
      description: 'Insurance & rewards',
      color: 'from-purple-500 to-pink-500',
      action: () => onNavigate('marketplace'),
    },
    {
      icon: Scan,
      title: 'Lab Report Scanner',
      description: 'AI document analysis',
      color: 'from-emerald-500 to-teal-500',
      action: () => onNavigate('scanner'),
    },
    {
      icon: TrendingUp,
      title: 'Future Self Simulator',
      description: '10-year projection',
      color: 'from-orange-500 to-amber-500',
      action: () => onNavigate('future'),
    },
  ];

  const stats = [
    { label: 'Vitality Score', value: results.vitalityScore, icon: Award, color: 'text-cyan-400' },
    { label: 'Bio Age', value: `${results.bioAge} yrs`, icon: Clock, color: 'text-emerald-400' },
    { label: 'Days Active', value: '14', icon: TrendingUp, color: 'text-purple-400' },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-sm text-slate-400">Manage your health data & preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-8 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-cyan-500/30">
                {userName.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </motion.div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-1">{userName}</h2>
              <p className="text-slate-400 text-sm mb-2">{userEmail}</p>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs text-emerald-400">
                  UAE Pass Verified
                </div>
                <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400">
                  DHA Connected
                </div>
              </div>
            </div>

            {/* Logout */}
            <motion.button
              onClick={onLogout}
              className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 px-4 py-2 rounded-xl transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className={`text-xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-4 text-slate-300">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  onClick={action.action}
                  className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-5 text-left hover:border-cyan-500/30 transition-all group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-white group-hover:text-cyan-400 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-slate-400">{action.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Data Privacy */}
        <motion.div
          className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <Database className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Data Privacy Dashboard</h3>
              <p className="text-sm text-slate-400 mb-4">
                Control which medical records the AI can access. Aligned with NABIDH standards.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Blood Test Results', enabled: true },
              { label: 'Vaccination Records', enabled: true },
              { label: 'Prescription History', enabled: false },
              { label: 'Hospital Visit Records', enabled: true },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-slate-800/30 rounded-xl p-3"
              >
                <span className="text-sm text-slate-300">{item.label}</span>
                <div
                  className={`w-12 h-6 rounded-full transition-all cursor-pointer ${
                    item.enabled ? 'bg-emerald-500' : 'bg-slate-600'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full mt-0.5"
                    animate={{ x: item.enabled ? 26 : 2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Member Info */}
        <motion.p
          className="text-center text-xs text-slate-500 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Member since {memberSince} • Dubai Health Innovation 2025
        </motion.p>
      </div>
    </div>
  );
}
