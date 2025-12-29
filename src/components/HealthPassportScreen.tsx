import { motion } from 'motion/react';
import { ArrowLeft, Shield, Database, Check, Activity, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { HealthData } from '../App';

interface HealthPassportScreenProps {
  healthData: HealthData;
  onBack: () => void;
}

export function HealthPassportScreen({ healthData, onBack }: HealthPassportScreenProps) {
  const [syncing, setSyncing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (syncing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setSyncing(false), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [syncing]);

  if (syncing) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="relative inline-block mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Database className="w-16 h-16 text-cyan-400" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-2">Syncing DHA Medical Records...</h2>
          <p className="text-slate-400 mb-6">Connecting to NABIDH Health Data Exchange</p>

          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-cyan-400">{progress}%</p>

          <div className="mt-8 space-y-2">
            <motion.p
              className="text-sm text-slate-500"
              animate={{ opacity: progress > 20 ? 1 : 0.3 }}
            >
              ✓ Authenticating with UAE Pass...
            </motion.p>
            <motion.p
              className="text-sm text-slate-500"
              animate={{ opacity: progress > 40 ? 1 : 0.3 }}
            >
              ✓ Accessing NABIDH database...
            </motion.p>
            <motion.p
              className="text-sm text-slate-500"
              animate={{ opacity: progress > 60 ? 1 : 0.3 }}
            >
              ✓ Retrieving blood test results...
            </motion.p>
            <motion.p
              className="text-sm text-slate-500"
              animate={{ opacity: progress > 80 ? 1 : 0.3 }}
            >
              ✓ Analyzing biomarkers...
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  const medicalRecords = [
    {
      category: 'Blood Tests',
      date: 'Dec 15, 2024',
      provider: 'Mediclinic Dubai',
      items: [
        { name: 'Vitamin D', value: '18 ng/mL', status: 'low', normal: '30-100 ng/mL' },
        { name: 'Cholesterol', value: '185 mg/dL', status: 'good', normal: '<200 mg/dL' },
        { name: 'Glucose', value: '92 mg/dL', status: 'good', normal: '70-100 mg/dL' },
        { name: 'Cortisol', value: '22 μg/dL', status: 'warning', normal: '6-23 μg/dL' },
      ],
    },
    {
      category: 'Vitals',
      date: 'Dec 20, 2024',
      provider: 'American Hospital Dubai',
      items: [
        { name: 'Blood Pressure', value: '118/76 mmHg', status: 'good', normal: '<120/80' },
        { name: 'Heart Rate', value: '68 bpm', status: 'good', normal: '60-100 bpm' },
        { name: 'BMI', value: '23.4', status: 'good', normal: '18.5-24.9' },
      ],
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
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
            <span>Back to Profile</span>
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              Health Passport
            </h1>
            <p className="text-sm text-slate-400">DHA & NABIDH Integration</p>
          </div>
        </motion.div>

        {/* Sync Status */}
        <motion.div
          className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-xl border border-emerald-700/30 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h3 className="font-semibold text-emerald-300">Sync Complete</h3>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            Successfully connected to Dubai Health Authority via NABIDH. Your medical records are encrypted and secure.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <Check className="w-4 h-4" />
            <span>Last synced: Just now • Next sync in 24 hours</span>
          </div>
        </motion.div>

        {/* Medical Records */}
        {medicalRecords.map((record, index) => (
          <motion.div
            key={index}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{record.category}</h3>
                <p className="text-sm text-slate-400">{record.provider}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">{record.date}</p>
              </div>
            </div>

            <div className="space-y-3">
              {record.items.map((item, itemIndex) => {
                const getStatusColor = () => {
                  if (item.status === 'good') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
                  if (item.status === 'warning') return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
                  return 'text-red-400 bg-red-500/10 border-red-500/30';
                };

                return (
                  <div
                    key={itemIndex}
                    className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-300">{item.name}</span>
                      <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor()}`}>
                        {item.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-cyan-400">{item.value}</span>
                      <span className="text-xs text-slate-500">Normal: {item.normal}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* AI Insights */}
        <motion.div
          className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-purple-700/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-purple-300 mb-2">AI Medical Insights</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Based on your DHA records, your Vitamin D level is below optimal range (18 ng/mL vs 30-100 ng/mL). 
                This is common in Dubai due to indoor lifestyles. Your Cortisol is at the upper normal limit, 
                indicating potential stress—consistent with your self-reported stress levels.
              </p>
              <div className="flex items-center gap-2 text-xs text-purple-400">
                <Activity className="w-4 h-4" />
                <span>Recommendation: Follow your Dubai Prescription for early morning sun exposure</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zero Bureaucracy Badge */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="inline-flex items-center gap-2 bg-slate-900/60 backdrop-blur-lg px-4 py-2 rounded-full border border-slate-700/50">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">Zero Bureaucracy • Instant DHA Access</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
