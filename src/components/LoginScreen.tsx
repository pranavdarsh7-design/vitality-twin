import { motion } from 'motion/react';
import { Sparkles, Shield, UserCheck, Mail, Phone, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showUAEPassForm, setShowUAEPassForm] = useState(false);
  const [uaePassData, setUaePassData] = useState({
    emiratesId: '',
    emailOrPhone: '',
  });

  const handleUAEPassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uaePassData.emiratesId && uaePassData.emailOrPhone) {
      onLogin();
    }
  };

  if (showUAEPassForm) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        <motion.div
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-green-600 mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">UAE Pass Login</h2>
            <p className="text-sm text-slate-400">Enter your credentials to continue</p>
          </motion.div>

          <motion.form
            onSubmit={handleUAEPassSubmit}
            className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm mb-2 text-slate-300">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                Emirates ID
              </label>
              <input
                type="text"
                placeholder="784-1234-1234567-1"
                value={uaePassData.emiratesId}
                onChange={(e) => setUaePassData({ ...uaePassData, emiratesId: e.target.value })}
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                required
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm mb-2 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400" />
                Email or Phone Number
              </label>
              <input
                type="text"
                placeholder="ahmed@email.com or +971 50 123 4567"
                value={uaePassData.emailOrPhone}
                onChange={(e) => setUaePassData({ ...uaePassData, emailOrPhone: e.target.value })}
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all mb-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue with UAE Pass
            </motion.button>

            <button
              type="button"
              onClick={() => setShowUAEPassForm(false)}
              className="w-full text-sm text-slate-400 hover:text-slate-300 transition-colors"
            >
              ← Back to login options
            </button>
          </motion.form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo and Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 mb-6 shadow-2xl shadow-cyan-500/50"
            animate={{
              boxShadow: [
                '0 0 30px rgba(6, 182, 212, 0.5)',
                '0 0 60px rgba(6, 182, 212, 0.8)',
                '0 0 30px rgba(6, 182, 212, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Vitality Twin
          </h1>
          <p className="text-slate-400 text-lg">Your AI-Powered Biological Age Predictor</p>
          <p className="text-xs text-cyan-400/60 mt-2">Dubai Health Innovation • Create Apps Championship 2025</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h2>

          {/* UAE Pass Login - Featured */}
          <motion.button
            onClick={() => setShowUAEPassForm(true)}
            className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group mb-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              <Shield className="w-6 h-6" />
              <span>Login with UAE Pass</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-xs text-slate-500">OR</span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* Quick Demo Login */}
          <motion.button
            onClick={onLogin}
            className="w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <UserCheck className="w-5 h-5" />
            Continue as Guest
          </motion.button>

          {/* Features */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Sync with DHA (Dubai Health Authority)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>NABIDH Medical Records Integration</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Zero Bureaucracy - Instant Access</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-slate-500 mb-2">
            🔒 End-to-end encrypted • GDPR & UAE Data Privacy compliant
          </p>
          <p className="text-xs text-slate-600">
            Aligned with Dubai 2040 Health Vision
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}