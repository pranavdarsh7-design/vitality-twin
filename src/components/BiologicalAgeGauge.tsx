import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface BiologicalAgeGaugeProps {
  chronologicalAge: number;
  bioAge: number;
  vitalityScore: number;
}

export function BiologicalAgeGauge({ chronologicalAge, bioAge, vitalityScore }: BiologicalAgeGaugeProps) {
  const difference = bioAge - chronologicalAge;
  const isYounger = difference < 0;
  const percentage = Math.min(vitalityScore, 100);
  
  // Determine color based on vitality score
  const getGaugeColors = () => {
    if (vitalityScore >= 75) {
      return {
        from: '#10b981',
        to: '#06b6d4',
        glow: 'rgba(16, 185, 129, 0.5)',
      };
    } else if (vitalityScore >= 50) {
      return {
        from: '#f59e0b',
        to: '#fbbf24',
        glow: 'rgba(245, 158, 11, 0.5)',
      };
    } else {
      return {
        from: '#ef4444',
        to: '#f97316',
        glow: 'rgba(239, 68, 68, 0.5)',
      };
    }
  };

  const colors = getGaugeColors();
  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Circular Gauge */}
        <div className="relative">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{ background: colors.glow }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* SVG Circle */}
          <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 320 320">
            {/* Background circle */}
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="rgba(51, 65, 85, 0.3)"
              strokeWidth="20"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.from} />
                <stop offset="100%" stopColor={colors.to} />
              </linearGradient>
            </defs>
            
            {/* Progress circle */}
            <motion.circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <p className="text-sm text-slate-400 mb-1">Biological Age</p>
              <motion.div
                className="text-6xl font-bold mb-2"
                style={{
                  background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              >
                {bioAge}
              </motion.div>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-slate-600" />
                <p className="text-sm text-slate-500">vs {chronologicalAge} years</p>
                <div className="h-px w-8 bg-slate-600" />
              </div>
              <motion.p
                className={`text-sm mt-2 font-semibold ${
                  isYounger ? 'text-emerald-400' : difference > 0 ? 'text-red-400' : 'text-yellow-400'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {isYounger ? `${Math.abs(difference).toFixed(1)} years younger!` : difference > 0 ? `+${difference.toFixed(1)} years` : 'On track'}
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="flex flex-col gap-4">
          <motion.div
            className="bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 min-w-[280px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <p className="text-sm text-slate-400">Vitality Score</p>
            </div>
            <div className="flex items-end gap-2">
              <motion.span
                className="text-4xl font-bold text-cyan-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {vitalityScore}
              </motion.span>
              <span className="text-slate-500 mb-1">/100</span>
            </div>
            <div className="mt-3 h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          <motion.div
            className={`bg-gradient-to-br backdrop-blur-lg border rounded-2xl p-6 ${
              isYounger
                ? 'from-emerald-900/20 to-teal-900/20 border-emerald-700/30'
                : difference > 0
                ? 'from-red-900/20 to-orange-900/20 border-red-700/30'
                : 'from-yellow-900/20 to-amber-900/20 border-yellow-700/30'
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-slate-400 mb-2">Health Status</p>
            <p
              className={`font-semibold ${
                isYounger ? 'text-emerald-300' : difference > 0 ? 'text-red-300' : 'text-yellow-300'
              }`}
            >
              {isYounger && '🎉 Biologically Younger'}
              {difference > 0 && '⚠️ Accelerated Aging Detected'}
              {difference === 0 && '✓ Age-Appropriate'}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {isYounger && 'Your lifestyle is working! Keep it up.'}
              {difference > 0 && 'Focus on the recommendations below.'}
              {difference === 0 && 'Small optimizations can make you younger.'}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}