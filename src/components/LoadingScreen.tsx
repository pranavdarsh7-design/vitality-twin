import { motion } from 'motion/react';
import { Brain, Sparkles } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated Brain Icon */}
        <motion.div
          className="relative inline-block mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-2xl opacity-50" />
          <Brain className="w-20 h-20 text-cyan-400 relative z-10" />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            AI Engine Analyzing...
          </h2>
          <p className="text-slate-400 mb-4">Processing local biomarkers & Dubai climate data</p>
        </motion.div>

        {/* Loading Bar */}
        <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Status Messages */}
        <div className="mt-6 space-y-2">
          <motion.p
            className="text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1], ease: 'easeInOut' }}
          >
            Calculating biological age markers...
          </motion.p>
          <motion.p
            className="text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 0.7, repeat: Infinity, times: [0, 0.5, 1], ease: 'easeInOut' }}
          >
            Analyzing Dubai-specific health factors...
          </motion.p>
          <motion.p
            className="text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 1.4, repeat: Infinity, times: [0, 0.5, 1], ease: 'easeInOut' }}
          >
            Generating personalized insights...
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}