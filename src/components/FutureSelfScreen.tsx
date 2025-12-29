import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Hologram3D } from './Hologram3D';
import type { HealthData, Results } from '../App';

interface FutureSelfScreenProps {
  healthData: HealthData;
  results: Results;
  onBack: () => void;
}

export function FutureSelfScreen({ healthData, results, onBack }: FutureSelfScreenProps) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const yearsAhead = selectedYear - currentYear;

  // Calculate future projections
  const getCurrentPathAge = () => {
    const agingRate = Math.max(0, results.bioAge - healthData.chronologicalAge);
    return results.bioAge + yearsAhead * (1 + agingRate * 0.3);
  };

  const getOptimizedPathAge = () => {
    return Math.max(
      healthData.chronologicalAge,
      results.bioAge - 4.2 + yearsAhead * 0.7
    );
  };

  const currentPathAge = getCurrentPathAge();
  const optimizedPathAge = getOptimizedPathAge();
  const isCurrentPath = true; // Toggle between paths

  // Determine avatar status based on year
  const getAvatarStatus = (year: number): 'healthy' | 'average' | 'unhealthy' => {
    const yearsFromNow = year - currentYear;
    if (yearsFromNow === 0) return results.healthStatus;
    
    // Current path gets worse over time
    if (yearsFromNow <= 3) return 'average';
    return 'unhealthy';
  };

  const getOptimizedAvatarStatus = (year: number): 'healthy' | 'average' | 'unhealthy' => {
    const yearsFromNow = year - currentYear;
    if (yearsFromNow === 0) return results.healthStatus;
    
    // Optimized path stays good
    if (results.vitalityScore >= 75) return 'healthy';
    if (yearsFromNow <= 5) return 'healthy';
    return 'average';
  };

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              Future Self Simulator
            </h1>
            <p className="text-sm text-slate-400">AI-powered aging prediction • See your future health</p>
          </div>
        </motion.div>

        {/* Year Slider */}
        <motion.div
          className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-lg">Time Travel: {selectedYear}</h3>
          </div>
          
          <div className="mb-4">
            <input
              type="range"
              min={currentYear}
              max={currentYear + 15}
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(selectedYear - currentYear) * (100 / 15)}%, rgb(51, 65, 85, 0.5) ${(selectedYear - currentYear) * (100 / 15)}%, rgb(51, 65, 85, 0.5) 100%)`,
              }}
            />
          </div>

          <div className="flex justify-between text-sm text-slate-400">
            <span>Today ({currentYear})</span>
            <span className="font-semibold text-cyan-400">+{yearsAhead} years</span>
            <span>{currentYear + 15}</span>
          </div>
        </motion.div>

        {/* Split View: Current Path vs Optimized Path */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Current Path */}
          <motion.div
            className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-xl border border-red-700/30 rounded-3xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-red-400" />
              <h3 className="font-semibold text-red-300">Current Path</h3>
            </div>

            {/* 3D Hologram Avatar */}
            <div className="mb-6">
              {results?.bioNodes ? (
                <Hologram3D 
                  healthStatus={getAvatarStatus(selectedYear)} 
                  bioNodes={results.bioNodes}
                  scale={0.8}
                />
              ) : (
                <div className="w-full h-48 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400">
                  Loading avatar...
                </div>
              )}
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-red-950/30 rounded-xl p-4 border border-red-800/30">
                <p className="text-sm text-slate-400 mb-1">Biological Age</p>
                <p className="text-3xl font-bold text-red-400">{Math.round(currentPathAge)}</p>
              </div>
              <div className="bg-red-950/30 rounded-xl p-4 border border-red-800/30">
                <p className="text-sm text-slate-400 mb-1">Health Status</p>
                <p className="text-lg font-semibold text-red-300">
                  {yearsAhead === 0 && results.healthStatus.charAt(0).toUpperCase() + results.healthStatus.slice(1)}
                  {yearsAhead > 0 && yearsAhead <= 3 && 'Declining'}
                  {yearsAhead > 3 && 'At Risk'}
                </p>
              </div>
            </div>

            <div className="text-sm text-slate-400">
              {yearsAhead === 0 && 'Current state without optimization'}
              {yearsAhead > 0 && `Without intervention, aging accelerates by ${Math.round((currentPathAge - (healthData.chronologicalAge + yearsAhead)) * 10) / 10} years`}
            </div>
          </motion.div>

          {/* Optimized Path */}
          <motion.div
            className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-xl border border-emerald-700/30 rounded-3xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
              <h3 className="font-semibold text-emerald-300">Vitality Path</h3>
            </div>

            {/* 3D Hologram Avatar */}
            <div className="mb-6">
              <Hologram3D 
                healthStatus={getOptimizedAvatarStatus(selectedYear)} 
                bioNodes={{
                  heart: 'good',
                  brain: 'good',
                  lungs: 'good',
                }}
                scale={0.8}
              />
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                <p className="text-sm text-slate-400 mb-1">Biological Age</p>
                <p className="text-3xl font-bold text-emerald-400">{Math.round(optimizedPathAge)}</p>
              </div>
              <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-800/30">
                <p className="text-sm text-slate-400 mb-1">Health Status</p>
                <p className="text-lg font-semibold text-emerald-300">
                  {yearsAhead <= 5 ? 'Optimal' : 'Excellent'}
                </p>
              </div>
            </div>

            <div className="text-sm text-slate-400">
              {yearsAhead === 0 && 'Start optimizing today'}
              {yearsAhead > 0 && `With optimization, you stay ${Math.round((currentPathAge - optimizedPathAge) * 10) / 10} years younger biologically`}
            </div>
          </motion.div>
        </div>

        {/* Key Differences */}
        <motion.div
          className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Key Differences in {selectedYear}
          </h3>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-slate-800/30 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-2">Age Gap</p>
              <p className="text-2xl font-bold text-cyan-400">
                {Math.round((currentPathAge - optimizedPathAge) * 10) / 10} yrs
              </p>
              <p className="text-xs text-slate-500 mt-1">Younger on Vitality Path</p>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-2">Energy Level</p>
              <p className="text-2xl font-bold text-emerald-400">+40%</p>
              <p className="text-xs text-slate-500 mt-1">With optimization</p>
            </div>
            <div className="bg-slate-800/30 rounded-xl p-4">
              <p className="text-sm text-slate-400 mb-2">Disease Risk</p>
              <p className="text-2xl font-bold text-purple-400">-35%</p>
              <p className="text-xs text-slate-500 mt-1">Reduced on Vitality Path</p>
            </div>
          </div>
        </motion.div>

        {/* Action Plan */}
        <motion.div
          className="bg-gradient-to-br from-cyan-900/20 to-emerald-900/20 backdrop-blur-xl border border-cyan-700/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-cyan-400 mb-2">Your Action Plan</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                The choice is yours. By following your personalized Dubai Prescription and completing 
                Longevity Quests, you can shift from the Current Path to the Vitality Path. 
                The difference compounds over time—small changes today lead to years of gained vitality tomorrow.
              </p>
              <motion.button
                onClick={onBack}
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Vitality Path Today
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
