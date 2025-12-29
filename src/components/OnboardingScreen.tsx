import { useState } from 'react';
import { Activity, Moon, Sun, Brain, Droplets, CloudSun, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import type { HealthData } from '../App';

interface OnboardingScreenProps {
  onSubmit: (data: HealthData) => void;
  onNavigate: (destination: 'passport' | 'marketplace' | 'future' | 'scanner') => void;
}

export function OnboardingScreen({ onSubmit, onNavigate }: OnboardingScreenProps) {
  const [formData, setFormData] = useState<HealthData>({
    chronologicalAge: 30,
    sleep: 7,
    vitaminD: 'normal',
    steps: 8000,
    stress: 'medium',
    uvExposure: 'moderate',
    hydration: 'good',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Vitality Twin
            </h1>
          </motion.div>
          <p className="text-slate-400 text-lg mb-2">Your AI-Powered Biological Age Predictor</p>
          <p className="text-xs text-cyan-400/60">Based on Dubai climate trends & 14 days of data</p>
        </div>

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Enter Your Health Metrics
          </h3>

          {/* Current Age */}
          <div className="mb-6">
            <label className="text-sm mb-2 text-slate-300 block">Current Age</label>
            <input
              type="number"
              min="18"
              max="100"
              value={formData.chronologicalAge}
              onChange={(e) => setFormData({ ...formData, chronologicalAge: parseInt(e.target.value) })}
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Grid of metrics */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* Sleep */}
            <div>
              <label className="flex items-center gap-2 text-sm mb-2 text-slate-300">
                <Moon className="w-4 h-4 text-indigo-400" />
                Sleep (hours/night)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="0.5"
                  value={formData.sleep}
                  onChange={(e) => setFormData({ ...formData, sleep: parseFloat(e.target.value) })}
                  className="flex-1 h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <span className="font-semibold text-indigo-400 w-12 text-right">{formData.sleep}h</span>
              </div>
              {formData.sleep < 6 && <p className="text-xs text-amber-400 mt-1">⚠️ Low sleep</p>}
            </div>

            {/* Steps */}
            <div>
              <label className="flex items-center gap-2 text-sm mb-2 text-slate-300">
                <Activity className="w-4 h-4 text-emerald-400" />
                Daily Steps
              </label>
              <input
                type="number"
                min="0"
                max="30000"
                step="100"
                value={formData.steps}
                onChange={(e) => setFormData({ ...formData, steps: parseInt(e.target.value) })}
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                required
              />
              {formData.steps > 10000 && <p className="text-xs text-emerald-400 mt-1">✓ Excellent!</p>}
            </div>
          </div>

          {/* Vitamin D */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm mb-2 text-slate-300">
              <Sun className="w-4 h-4 text-yellow-400" />
              Vitamin D Level (Common deficiency in Dubai)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['low', 'normal', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, vitaminD: level })}
                  className={`py-3 rounded-xl transition-all ${
                    formData.vitaminD === level
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Stress & UV Exposure */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* Stress */}
            <div>
              <label className="flex items-center gap-2 text-sm mb-2 text-slate-300">
                <Brain className="w-4 h-4 text-purple-400" />
                Stress Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, stress: level })}
                    className={`py-2 rounded-lg text-xs transition-all ${
                      formData.stress === level
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* UV Exposure */}
            <div>
              <label className="flex items-center gap-2 text-sm mb-2 text-slate-300">
                <CloudSun className="w-4 h-4 text-orange-400" />
                Dubai UV Exposure
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'moderate', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, uvExposure: level })}
                    className={`py-2 rounded-lg text-xs transition-all ${
                      formData.uvExposure === level
                        ? 'bg-orange-600 text-white'
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hydration */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm mb-2 text-slate-300">
              <Droplets className="w-4 h-4 text-blue-400" />
              Hydration Level (Critical in Dubai heat)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['poor', 'good', 'excellent'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, hydration: level })}
                  className={`py-3 rounded-xl transition-all ${
                    formData.hydration === level
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate My Vitality Twin
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          🔒 Your data is processed locally • Dubai Health Innovation 2025
        </p>
      </motion.div>
    </div>
  );
}