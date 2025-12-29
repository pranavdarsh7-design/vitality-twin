import { motion } from 'motion/react';

interface EnhancedDigitalTwinProps {
  healthStatus: 'healthy' | 'average' | 'unhealthy';
  bioNodes: {
    heart: 'good' | 'warning' | 'critical';
    brain: 'good' | 'warning' | 'critical';
    lungs: 'good' | 'warning' | 'critical';
  };
}

export function EnhancedDigitalTwin({ healthStatus, bioNodes }: EnhancedDigitalTwinProps) {
  const getColor = () => {
    switch (healthStatus) {
      case 'healthy':
        return {
          primary: '#10b981',
          secondary: '#34d399',
          glow: 'rgba(16, 185, 129, 0.5)',
        };
      case 'average':
        return {
          primary: '#f59e0b',
          secondary: '#fbbf24',
          glow: 'rgba(245, 158, 11, 0.5)',
        };
      case 'unhealthy':
        return {
          primary: '#ef4444',
          secondary: '#f87171',
          glow: 'rgba(239, 68, 68, 0.5)',
        };
    }
  };

  const getNodeColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'critical':
        return '#ef4444';
    }
  };

  const colors = getColor();

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glassmorphism container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 300 500"
          className="w-64 sm:w-80 h-auto drop-shadow-2xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <motion.ellipse
            cx="150"
            cy="70"
            rx="45"
            ry="50"
            fill={`${colors.primary}15`}
            stroke={colors.primary}
            strokeWidth="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />

          {/* Neck */}
          <motion.rect
            x="135"
            y="115"
            width="30"
            height="25"
            fill={`${colors.primary}10`}
            stroke={colors.primary}
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />

          {/* Torso - Glassmorphism effect */}
          <motion.ellipse
            cx="150"
            cy="230"
            rx="70"
            ry="95"
            fill={`${colors.primary}08`}
            stroke={colors.primary}
            strokeWidth="3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          />

          {/* Spine glow */}
          <motion.line
            x1="150"
            y1="140"
            x2="150"
            y2="325"
            stroke={colors.secondary}
            strokeWidth="2"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.6, pathLength: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          />

          {/* Arms */}
          <motion.line
            x1="80"
            y1="180"
            x2="50"
            y2="280"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5 }}
          />
          <motion.line
            x1="220"
            y1="180"
            x2="250"
            y2="280"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5 }}
          />

          {/* Legs */}
          <motion.line
            x1="120"
            y1="325"
            x2="100"
            y2="470"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6 }}
          />
          <motion.line
            x1="180"
            y1="325"
            x2="200"
            y2="470"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6 }}
          />

          {/* Bio-Node: Brain */}
          <g>
            <motion.circle
              cx="150"
              cy="60"
              r="12"
              fill={getNodeColor(bioNodes.brain)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            />
            <motion.circle
              cx="150"
              cy="60"
              r="12"
              fill="none"
              stroke={getNodeColor(bioNodes.brain)}
              strokeWidth="2"
              animate={{
                r: [12, 18, 12],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          </g>

          {/* Bio-Node: Heart */}
          <g>
            <motion.circle
              cx="150"
              cy="200"
              r="14"
              fill={getNodeColor(bioNodes.heart)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
            />
            <motion.circle
              cx="150"
              cy="200"
              r="14"
              fill="none"
              stroke={getNodeColor(bioNodes.heart)}
              strokeWidth="2"
              animate={{
                r: [14, 22, 14],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          </g>

          {/* Bio-Node: Lungs */}
          <g>
            <motion.circle
              cx="120"
              cy="210"
              r="10"
              fill={getNodeColor(bioNodes.lungs)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ delay: 1.1, type: 'spring' }}
            />
            <motion.circle
              cx="180"
              cy="210"
              r="10"
              fill={getNodeColor(bioNodes.lungs)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ delay: 1.1, type: 'spring' }}
            />
            <motion.circle
              cx="120"
              cy="210"
              r="10"
              fill="none"
              stroke={getNodeColor(bioNodes.lungs)}
              strokeWidth="2"
              animate={{
                r: [10, 16, 10],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.circle
              cx="180"
              cy="210"
              r="10"
              fill="none"
              stroke={getNodeColor(bioNodes.lungs)}
              strokeWidth="2"
              animate={{
                r: [10, 16, 10],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.3,
              }}
            />
          </g>

          {/* Neural network lines */}
          <motion.path
            d="M150 80 L150 140 M120 210 L150 200 M180 210 L150 200 M150 200 L150 240"
            stroke={colors.secondary}
            strokeWidth="1.5"
            fill="none"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.4, pathLength: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
          />

          {/* Energy particles */}
          {[...Array(12)].map((_, i) => (
            <motion.circle
              key={i}
              cx={150 + Math.cos((i * Math.PI * 2) / 12) * 60}
              cy={230 + Math.sin((i * Math.PI * 2) / 12) * 80}
              r="2"
              fill={colors.secondary}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </svg>
      </div>

      {/* Bio-node legend */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-lg px-3 py-1.5 rounded-full border border-slate-800">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getNodeColor(bioNodes.brain) }} />
          <span className="text-slate-400">Brain</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-lg px-3 py-1.5 rounded-full border border-slate-800">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getNodeColor(bioNodes.heart) }} />
          <span className="text-slate-400">Heart</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-lg px-3 py-1.5 rounded-full border border-slate-800">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getNodeColor(bioNodes.lungs) }} />
          <span className="text-slate-400">Lungs</span>
        </div>
      </div>
    </div>
  );
}