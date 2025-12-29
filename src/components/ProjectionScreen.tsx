import { motion } from 'motion/react';
import { Sparkles, TrendingDown, TrendingUp, Calendar } from 'lucide-react';
import type { HealthData, Results } from '../App';

interface ProjectionScreenProps {
  healthData: HealthData;
  results: Results;
}

export function ProjectionScreen({ healthData, results }: ProjectionScreenProps) {
  const currentYear = new Date().getFullYear();
  const projectionYear = currentYear + 10;

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              10-Year Projection
            </h1>
          </div>
          <p className="text-sm text-slate-400">AI-powered longevity forecast • {currentYear} → {projectionYear}</p>
        </motion.div>

        {/* Split Screen Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Current Path */}
          <motion.div
            className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-xl border border-red-700/30 rounded-3xl p-6 sm:p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-semibold text-red-300">Current Path</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-slate-400 mb-2">Projected Bio-Age by {projectionYear}</p>
              <div className="text-5xl font-bold text-red-400 mb-2">
                {Math.round(results.bioAge + Math.max(0, results.bioAge - healthData.chronologicalAge) * 3)}
              </div>
              <p className="text-sm text-red-300">years old</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-red-950/30 rounded-xl p-3 border border-red-800/30">
                <p className="text-sm text-slate-300">⚠️ Accelerated cellular aging</p>
              </div>
              <div className="bg-red-950/30 rounded-xl p-3 border border-red-800/30">
                <p className="text-sm text-slate-300">⚠️ Increased inflammation markers</p>
              </div>
              <div className="bg-red-950/30 rounded-xl p-3 border border-red-800/30">
                <p className="text-sm text-slate-300">⚠️ Reduced mitochondrial function</p>
              </div>
            </div>

            <div className="relative h-32 bg-slate-950/50 rounded-xl overflow-hidden border border-red-800/30">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-500 to-orange-500 opacity-60"
                initial={{ height: 0 }}
                animate={{ height: '70%' }}
                transition={{ delay: 0.5, duration: 1 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm font-semibold text-white z-10">Energy Level: Low</p>
              </div>
            </div>
          </motion.div>

          {/* Vitality Path */}
          <motion.div
            className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-xl border border-emerald-700/30 rounded-3xl p-6 sm:p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-semibold text-emerald-300">Vitality Path</h3>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-slate-400 mb-2">Optimized Bio-Age by {projectionYear}</p>
              <div className="text-5xl font-bold text-emerald-400 mb-2">
                {Math.max(healthData.chronologicalAge, Math.round(results.bioAge - 4.2))}
              </div>
              <p className="text-sm text-emerald-300">years old</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-emerald-950/30 rounded-xl p-3 border border-emerald-800/30">
                <p className="text-sm text-slate-300">✓ Optimal cellular regeneration</p>
              </div>
              <div className="bg-emerald-950/30 rounded-xl p-3 border border-emerald-800/30">
                <p className="text-sm text-slate-300">✓ Reduced oxidative stress</p>
              </div>
              <div className="bg-emerald-950/30 rounded-xl p-3 border border-emerald-800/30">
                <p className="text-sm text-slate-300">✓ Enhanced metabolic efficiency</p>
              </div>
            </div>

            <div className="relative h-32 bg-slate-950/50 rounded-xl overflow-hidden border border-emerald-800/30">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-teal-500 opacity-80"
                initial={{ height: 0 }}
                animate={{ height: '95%' }}
                transition={{ delay: 0.7, duration: 1 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm font-semibold text-white z-10">Energy Level: Optimal</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Prediction */}
        <motion.div
          className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2 text-cyan-400">AI Longevity Insight</h3>
              <p className="text-slate-300 leading-relaxed">{results.prediction}</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Your Optimization Timeline
          </h3>

          <div className="space-y-6">
            {[
              {
                year: currentYear,
                title: 'Start Today',
                description: 'Begin implementing actionable triumphs',
                progress: 100,
              },
              {
                year: currentYear + 2,
                title: 'Early Wins',
                description: 'Vitality Score improves by 15-20 points',
                progress: 75,
              },
              {
                year: currentYear + 5,
                title: 'Mid-Point',
                description: 'Bio-Age reduced by 2-3 years',
                progress: 50,
              },
              {
                year: projectionYear,
                title: 'Target Achieved',
                description: 'Reclaim 4.2 years of cellular health',
                progress: 25,
              },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center font-semibold text-sm">
                    {milestone.year}
                  </div>
                  {index < 3 && <div className="w-0.5 h-12 bg-slate-700 my-2" />}
                </div>
                <div className="flex-1 pb-6">
                  <h4 className="font-semibold text-cyan-400 mb-1">{milestone.title}</h4>
                  <p className="text-sm text-slate-400">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
