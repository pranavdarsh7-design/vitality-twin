import { motion } from 'motion/react';
import { Sparkles, MapPin, Trophy, Clock, TrendingUp, CheckCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { Results } from '../App';

interface QuestsScreenProps {
  results: Results;
}

interface Quest {
  title: string;
  location: string;
  reward: string;
  impact: string;
  description: string;
  duration: string;
  difficulty: string;
  color: string;
  mapUrl: string;
  bookingUrl: string;
}

export function QuestsScreen({ results }: QuestsScreenProps) {
  const [activeQuest, setActiveQuest] = useState<number | null>(null);
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);

  const quests: Quest[] = [
    {
      title: 'Desert Dawn Walk',
      location: 'Mushrif Park',
      reward: '+2 Vitality Points',
      impact: '-0.1 Bio Days',
      description: 'Take a 30-minute walk through shaded trails during golden hour (6-7 AM)',
      duration: '30 min',
      difficulty: 'Easy',
      color: 'from-amber-500 to-orange-500',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Mushrif+Park+Dubai',
      bookingUrl: 'https://www.google.com/maps/place/Mushrif+Park/',
    },
    {
      title: 'Cryotherapy Recovery',
      location: 'Jumeirah Wellness Hub',
      reward: '+5 Vitality Points',
      impact: '-0.2 Bio Days',
      description: 'Experience a -110°C session to boost cellular recovery and reduce inflammation',
      duration: '3 min',
      difficulty: 'Medium',
      color: 'from-blue-500 to-cyan-500',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cryotherapy+Dubai+JLT',
      bookingUrl: 'https://cryotherapy-dubai.ae/',
    },
    {
      title: 'Sunrise Yoga Session',
      location: 'Kite Beach',
      reward: '+3 Vitality Points',
      impact: '-0.15 Bio Days',
      description: 'Join outdoor yoga at 6 AM to maximize Vitamin D absorption during cooler hours',
      duration: '45 min',
      difficulty: 'Easy',
      color: 'from-purple-500 to-pink-500',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kite+Beach+Dubai',
      bookingUrl: 'https://www.instagram.com/explore/tags/kitebeachyoga/',
    },
    {
      title: 'Himalayan Salt Cave',
      location: 'Talise Spa',
      reward: '+4 Vitality Points',
      impact: '-0.15 Bio Days',
      description: 'Improve respiratory health and combat indoor air quality issues',
      duration: '45 min',
      difficulty: 'Easy',
      color: 'from-emerald-500 to-teal-500',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Talise+Spa+Dubai',
      bookingUrl: 'https://www.jumeirah.com/en/stay/dubai/madinat-jumeirah/talise-spa',
    },
    {
      title: 'NAD+ IV Therapy',
      location: 'Nova Clinic - Dubai Healthcare City',
      reward: '+8 Vitality Points',
      impact: '-0.3 Bio Days',
      description: 'Support cellular energy production and longevity at the molecular level',
      duration: '60 min',
      difficulty: 'Advanced',
      color: 'from-indigo-500 to-purple-500',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Nova+Clinic+Dubai+Healthcare+City',
      bookingUrl: 'https://novadubai.com/',
    },
    {
      title: 'Biometric Screening',
      location: 'Museum of the Future',
      reward: '+6 Vitality Points',
      impact: '-0.25 Bio Days',
      description: 'Get personalized longevity insights from cutting-edge health technology',
      duration: '90 min',
      difficulty: 'Medium',
      color: 'from-cyan-500 to-blue-500',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Museum+of+the+Future+Dubai',
      bookingUrl: 'https://museumofthefuture.ae/',
    },
  ];

  const handleStartQuest = (index: number) => {
    setActiveQuest(index);
  };

  const handleCompleteQuest = (index: number) => {
    setCompletedQuests([...completedQuests, index]);
    setActiveQuest(null);
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
            <Trophy className="w-6 h-6 text-cyan-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Longevity Quests
            </h1>
          </div>
          <p className="text-sm text-slate-400">Dubai-specific wellness challenges • Earn vitality points</p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          className="bg-gradient-to-r from-cyan-900/20 to-emerald-900/20 backdrop-blur-xl border border-cyan-700/30 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <TrendingUp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">{results.vitalityScore}</div>
              <div className="text-xs text-slate-400">Current Score</div>
            </div>
            <div className="text-center">
              <Trophy className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-400">{completedQuests.length}/{quests.length}</div>
              <div className="text-xs text-slate-400">Completed</div>
            </div>
            <div className="text-center">
              <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{completedQuests.length * 4}</div>
              <div className="text-xs text-slate-400">Points Earned</div>
            </div>
          </div>
        </motion.div>

        {/* Active Quest Details */}
        {activeQuest !== null && (
          <motion.div
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-700/40 rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-xl text-purple-300">Quest In Progress</h3>
              <button
                onClick={() => handleCompleteQuest(activeQuest)}
                className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-500/30 transition-all"
              >
                Mark Complete
              </button>
            </div>
            <p className="text-slate-300 mb-4">{quests[activeQuest].title} at {quests[activeQuest].location}</p>
            <div className="flex gap-3">
              <a
                href={quests[activeQuest].mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-500/30 transition-all"
              >
                <MapPin className="w-4 h-4" />
                Directions
              </a>
              <button
                onClick={() => setActiveQuest(null)}
                className="bg-slate-700/50 text-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-600/50 transition-all"
              >
                Cancel Quest
              </button>
            </div>
          </motion.div>
        )}

        {/* Quests Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest, index) => {
            const isCompleted = completedQuests.includes(index);
            const isActive = activeQuest === index;

            return (
              <motion.div
                key={index}
                className={`bg-slate-900/40 backdrop-blur-xl border rounded-2xl overflow-hidden ${
                  isCompleted
                    ? 'border-emerald-500/30 opacity-60'
                    : isActive
                    ? 'border-purple-500/50'
                    : 'border-slate-800/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: isCompleted ? 1 : 1.02 }}
              >
                {/* Quest Header */}
                <div className={`bg-gradient-to-r ${quest.color} p-4`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white">{quest.title}</h3>
                    {isCompleted && <CheckCircle className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{quest.location}</span>
                  </div>
                </div>

                {/* Quest Body */}
                <div className="p-5">
                  <p className="text-sm text-slate-400 mb-4">{quest.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-800/30 rounded-lg p-2">
                      <Clock className="w-4 h-4 text-cyan-400 mb-1" />
                      <div className="text-xs text-slate-400">Duration</div>
                      <div className="text-sm font-semibold text-white">{quest.duration}</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-lg p-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400 mb-1" />
                      <div className="text-xs text-slate-400">Impact</div>
                      <div className="text-sm font-semibold text-emerald-400">{quest.impact}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-slate-500">Difficulty: {quest.difficulty}</span>
                    <span className="text-sm font-semibold text-cyan-400">{quest.reward}</span>
                  </div>

                  {/* Action Buttons */}
                  {isCompleted ? (
                    <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-lg p-3 text-center">
                      <span className="text-sm text-emerald-300 font-semibold">✓ Completed</span>
                    </div>
                  ) : isActive ? (
                    <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 text-center">
                      <span className="text-sm text-purple-300 font-semibold">In Progress...</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleStartQuest(index)}
                        className={`bg-gradient-to-r ${quest.color} text-white py-2 px-3 rounded-lg text-sm font-semibold hover:shadow-lg transition-all`}
                      >
                        Start Quest
                      </button>
                      <a
                        href={quest.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 py-2 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Book
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rewards Info */}
        <motion.div
          className="mt-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-start gap-3">
            <Trophy className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg text-cyan-400 mb-2">Quest Rewards</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Complete quests to earn Vitality Points and reduce your biological age. 
                Each quest targets specific health markers based on Dubai's climate challenges. 
                Rewards include DHA consultation vouchers and gold prizes for consistent participation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
