import { motion } from 'motion/react';
import { Sparkles, Moon, Activity, Brain, CloudSun, TrendingDown, TrendingUp, Minus, ChevronDown, ChevronUp, MapPin, ExternalLink, Database, Sun, Flame, Trophy, Award } from 'lucide-react';
import { EnhancedDigitalTwin } from './EnhancedDigitalTwin';
import { BiologicalAgeGauge } from './BiologicalAgeGauge';
import { TrendLineChart } from './TrendLineChart';
import type { HealthData, Results } from '../App';
import { useState } from 'react';

interface DashboardScreenProps {
  healthData: HealthData;
  results: Results;
  onReset: () => void;
  onNavigate: (destination: 'passport' | 'marketplace' | 'future' | 'scanner') => void;
  isGuestMode?: boolean;
  questStreak?: number;
  totalQuestsCompleted?: number;
  goldProgress?: number;
}

export function DashboardScreen({ 
  healthData, 
  results, 
  onReset, 
  onNavigate,
  isGuestMode = false,
  questStreak = 3,
  totalQuestsCompleted = 7,
  goldProgress = 35
}: DashboardScreenProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showOptimalPath, setShowOptimalPath] = useState(false);
  const ageDifference = results.bioAge - healthData.chronologicalAge;

  // Calculate AI confidence based on data sources
  const calculateAIConfidence = () => {
    let confidence = 65; // Base confidence
    if (healthData.sleep && healthData.steps) confidence += 15;
    if (healthData.vitaminD !== 'normal') confidence += 10; // Lab data simulation
    if (healthData.stress && healthData.hydration) confidence += 10;
    return Math.min(confidence, 95);
  };

  const aiConfidence = calculateAIConfidence();
  const confidenceLevel = aiConfidence >= 85 ? 'High' : aiConfidence >= 70 ? 'Medium' : 'Moderate';

  const metricCards = [
    {
      icon: Moon,
      label: 'Sleep',
      value: `${healthData.sleep} hrs`,
      status: healthData.sleep >= 7 ? 'good' : healthData.sleep >= 6 ? 'warning' : 'critical',
      color: 'indigo',
    },
    {
      icon: Activity,
      label: 'Activity',
      value: `${healthData.steps.toLocaleString()} steps`,
      status: healthData.steps >= 10000 ? 'good' : healthData.steps >= 5000 ? 'warning' : 'critical',
      color: 'emerald',
    },
    {
      icon: Brain,
      label: 'Stress',
      value: healthData.stress.charAt(0).toUpperCase() + healthData.stress.slice(1),
      status: healthData.stress === 'low' ? 'good' : healthData.stress === 'medium' ? 'warning' : 'critical',
      color: 'purple',
    },
    {
      icon: CloudSun,
      label: 'Dubai UV',
      value: healthData.uvExposure.charAt(0).toUpperCase() + healthData.uvExposure.slice(1),
      status: healthData.uvExposure === 'low' ? 'good' : healthData.uvExposure === 'moderate' ? 'warning' : 'critical',
      color: 'orange',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'good') return 'text-emerald-400';
    if (status === 'warning') return 'text-amber-400';
    return 'text-red-400';
  };

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
              Your Vitality Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-500 mb-2">✨ AI Insight: Based on 14 days of data & Dubai climate trends</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-900/30 rounded-full border border-cyan-700/30">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="text-xs text-cyan-400">AI Confidence: {confidenceLevel} ({aiConfidence}%)</span>
          </div>
        </motion.div>

        {/* Guest Mode Disclaimer */}
        {isGuestMode && (
          <motion.div
            className="mb-6 bg-amber-900/20 backdrop-blur-xl border border-amber-700/30 rounded-2xl p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm text-amber-300 text-center">
              🔓 <span className="font-semibold">Guest Mode:</span> Limited insights available. 
              For full personalization and DHA sync, connect with UAE Pass.
            </p>
          </motion.div>
        )}

        {/* Gamification Banner */}
        <motion.div
          className="mb-6 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-orange-900/30 backdrop-blur-xl border border-purple-700/40 rounded-2xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <div className="grid grid-cols-3 gap-4">
            {/* Streak Counter */}
            <motion.div 
              className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-4 text-center border border-orange-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">{questStreak}</div>
              <div className="text-xs text-slate-400">Day Streak</div>
            </motion.div>

            {/* Level Badge */}
            <motion.div 
              className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-4 text-center border border-purple-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">Level {Math.floor(totalQuestsCompleted / 5) + 1}</div>
              <div className="text-xs text-slate-400">{totalQuestsCompleted} Quests Done</div>
            </motion.div>

            {/* Gold Progress */}
            <motion.div 
              className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-4 text-center border border-yellow-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{goldProgress}%</div>
              <div className="text-xs text-slate-400">to 1g Gold Bar</div>
              <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${goldProgress}%` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Today's 3 Triumphs - Priority Section */}
        <motion.div
          className="mb-8 bg-gradient-to-br from-cyan-900/30 to-emerald-900/30 backdrop-blur-xl border border-cyan-700/40 rounded-3xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Today's 3 Triumphs
            </h2>
            <div className="text-xs text-slate-400">Start before 9 AM for max impact</div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <motion.div
              className="bg-slate-900/40 backdrop-blur-lg rounded-2xl p-5 border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3 font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold text-white mb-2">Morning Walk</h3>
              <p className="text-sm text-slate-400">Walk 20 minutes before 9 AM at Kite Beach for Vitamin D</p>
            </motion.div>
            <motion.div
              className="bg-slate-900/40 backdrop-blur-lg rounded-2xl p-5 border border-emerald-500/30 hover:border-emerald-400/50 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3 font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold text-white mb-2">Hydrate</h3>
              <p className="text-sm text-slate-400">Drink 2 extra glasses of water (500ml) for Dubai heat</p>
            </motion.div>
            <motion.div
              className="bg-slate-900/40 backdrop-blur-lg rounded-2xl p-5 border border-purple-500/30 hover:border-purple-400/50 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3 font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold text-white mb-2">Breathe</h3>
              <p className="text-sm text-slate-400">10 minutes of deep breathing or meditation to lower cortisol</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Metric - Biological Age Gauge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <BiologicalAgeGauge
            chronologicalAge={healthData.chronologicalAge}
            bioAge={results.bioAge}
            vitalityScore={results.vitalityScore}
          />
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {metricCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-4 hover:border-slate-700/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 text-${card.color}-400`} />
                  <span className="text-xs text-slate-400">{card.label}</span>
                </div>
                <div className={`text-xl font-semibold ${getStatusColor(card.status)}`}>
                  {card.value}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Twin Visualization */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Your Digital Twin
            </h3>
            <EnhancedDigitalTwin healthStatus={results.healthStatus} bioNodes={results.bioNodes} />
          </div>
        </motion.div>

        {/* DHA Sync Button & Climate Insight */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* DHA Sync */}
          <motion.button
            onClick={() => onNavigate('passport')}
            className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-xl border border-blue-700/40 rounded-2xl p-5 hover:border-blue-600/50 transition-all group text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-3">
              <Database className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-300 mb-1 flex items-center gap-2">
                  Sync with DHA
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-sm text-slate-400">Connect to Dubai Health Authority for real-time medical data</p>
              </div>
            </div>
          </motion.button>

          {/* Climate Insight */}
          <motion.div
            className="bg-gradient-to-br from-orange-900/30 to-amber-900/30 backdrop-blur-xl border border-orange-700/40 rounded-2xl p-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 }}
          >
            <div className="flex items-start gap-3">
              <Sun className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-300 mb-1">High UV Today in Dubai</h4>
                <p className="text-sm text-slate-400">Your Vitality Twin suggests moving your workout to Dubai Fitness First to avoid oxidative stress</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trend Line Chart */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <TrendLineChart healthData={healthData} results={results} />
        </motion.div>

        {/* Vitality Status Card */}
        <motion.div
          className="mb-6 bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-3">
            {ageDifference < 0 ? (
              <TrendingDown className="w-6 h-6 text-emerald-400" />
            ) : ageDifference > 0 ? (
              <TrendingUp className="w-6 h-6 text-red-400" />
            ) : (
              <Minus className="w-6 h-6 text-yellow-400" />
            )}
            <h3 className="font-semibold text-lg">Vitality Status</h3>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {results.vitalityScore >= 75 && 'Excellent! Your cellular health indicators show optimal longevity potential for the Dubai climate.'}
            {results.vitalityScore >= 50 && results.vitalityScore < 75 && 'Good foundations, but there\'s room for biological optimization—especially considering Dubai\'s environmental factors.'}
            {results.vitalityScore < 50 && 'Immediate intervention needed to reverse accelerated aging patterns. Dubai\'s climate requires extra attention to hydration and Vitamin D.'}
          </p>
        </motion.div>

        {/* Actionable Triumphs */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Start Today: Actionable Triumphs
          </h3>
          <div className="space-y-3">
            {results.actionableTriumphs.map((triumph, index) => (
              <motion.div
                key={index}
                className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-xl p-4 hover:border-cyan-500/30 transition-all cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-300">{triumph}</p>
                    {expandedCard === index && (
                      <motion.div
                        className="mt-3 pt-3 border-t border-slate-700/50 text-sm text-slate-400"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <p>💡 This action can improve your Vitality Score by 5-10 points within 2 weeks.</p>
                      </motion.div>
                    )}
                  </div>
                  {expandedCard === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dubai Prescription */}
        <motion.div
          className="mb-6 w-full bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-xl border border-emerald-700/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="font-semibold text-lg text-emerald-300 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Your Dubai Prescription
          </h3>
          <p className="text-slate-300 leading-relaxed mb-4">{results.dubaiPrescription}</p>
          
          <div className="flex flex-wrap gap-3">
            <motion.a
              href="https://www.google.com/maps/dir/?api=1&destination=Kite+Beach+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-lg px-4 py-2 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-300">Get Directions</span>
            </motion.a>
            <motion.a
              href="https://talisespa.com/dubai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-cyan-500/20 backdrop-blur-lg px-4 py-2 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">Book Now</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Reset Button */}
        <motion.button
          onClick={onReset}
          className="w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 py-3 rounded-xl transition-all mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          Recalculate Results
        </motion.button>

        {/* Medical Disclaimer */}
        <motion.div
          className="text-center bg-slate-900/30 backdrop-blur-lg rounded-xl p-4 border border-slate-800/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <p className="text-xs text-slate-500 leading-relaxed">
            ⚕️ <span className="font-semibold">Medical Disclaimer:</span> This is not a medical diagnosis. 
            Insights are for wellness guidance only. Consult with licensed healthcare professionals before making health decisions. 
            Data compliant with UAE Health Data Regulations & NABIDH standards.
          </p>
        </motion.div>
      </div>
    </div>
  );
}