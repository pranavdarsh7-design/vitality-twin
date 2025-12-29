import { motion } from 'motion/react';

interface Hologram3DProps {
  healthStatus: 'healthy' | 'average' | 'unhealthy';
  bioNodes: {
    heart: 'good' | 'warning' | 'critical';
    brain: 'good' | 'warning' | 'critical';
    lungs: 'good' | 'warning' | 'critical';
  };
  scale?: number;
}

export function Hologram3D({ healthStatus, bioNodes, scale = 1 }: Hologram3DProps) {
  const getColor = () => {
    switch (healthStatus) {
      case 'healthy':
        return {
          primary: '#10b981',
          secondary: '#06b6d4',
          glow: 'rgba(16, 185, 129, 0.6)',
        };
      case 'average':
        return {
          primary: '#f59e0b',
          secondary: '#fbbf24',
          glow: 'rgba(245, 158, 11, 0.6)',
        };
      case 'unhealthy':
        return {
          primary: '#ef4444',
          secondary: '#f87171',
          glow: 'rgba(239, 68, 68, 0.6)',
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
    <div className="relative w-full aspect-square flex items-center justify-center" style={{ transform: `scale(${scale})` }}>
      {/* Hologram platform glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-3">
        <motion.div
          className="w-full h-full rounded-full opacity-40 blur-xl"
          style={{ background: colors.glow }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Hologram platform rings */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 rounded-full border-2"
            style={{
              width: `${120 + i * 20}px`,
              height: `${8 - i * 2}px`,
              borderColor: colors.primary,
              opacity: 0.3 - i * 0.1,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3 - i * 0.1, 0.5 - i * 0.1, 0.3 - i * 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main 3D Hologram SVG */}
      <svg
        viewBox="0 0 300 500"
        className="w-48 sm:w-56 h-auto drop-shadow-2xl relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical scan lines */}
        <defs>
          <linearGradient id="hologramGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0.6" />
          </linearGradient>
          <pattern id="scanlines" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="1" fill={colors.primary} opacity="0.1" />
          </pattern>
        </defs>

        {/* Body mesh wireframe */}
        {/* Head */}
        <motion.ellipse
          cx="150"
          cy="70"
          rx="45"
          ry="50"
          fill={`url(#hologramGradient)`}
          opacity="0.15"
          stroke={colors.primary}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.1 }}
        />
        <motion.ellipse
          cx="150"
          cy="70"
          rx="45"
          ry="50"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.6, pathLength: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        />

        {/* Neck */}
        <motion.line
          x1="150"
          y1="115"
          x2="150"
          y2="140"
          stroke={colors.primary}
          strokeWidth="3"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.8, pathLength: 1 }}
          transition={{ delay: 0.3 }}
        />

        {/* Torso with mesh detail */}
        <motion.ellipse
          cx="150"
          cy="230"
          rx="70"
          ry="95"
          fill={`url(#hologramGradient)`}
          opacity="0.2"
          stroke={colors.primary}
          strokeWidth="2.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: 0.4 }}
        />

        {/* Horizontal body grid lines */}
        {[160, 180, 200, 220, 240, 260, 280, 300].map((y, i) => (
          <motion.line
            key={i}
            x1="85"
            y1={y}
            x2="215"
            y2={y}
            stroke={colors.secondary}
            strokeWidth="0.5"
            opacity="0.3"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.3, pathLength: 1 }}
            transition={{ delay: 0.5 + i * 0.05 }}
          />
        ))}

        {/* Spine with energy flow */}
        <motion.line
          x1="150"
          y1="140"
          x2="150"
          y2="325"
          stroke={colors.secondary}
          strokeWidth="2"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4], pathLength: 1 }}
          transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
        />

        {/* Shoulders */}
        <motion.line
          x1="80"
          y1="160"
          x2="220"
          y2="160"
          stroke={colors.primary}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* Arms with segments */}
        <motion.path
          d="M 80 160 L 50 190 L 45 250 L 50 280"
          stroke={colors.primary}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{ delay: 0.6 }}
        />
        <motion.path
          d="M 220 160 L 250 190 L 255 250 L 250 280"
          stroke={colors.primary}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{ delay: 0.6 }}
        />

        {/* Legs with segments */}
        <motion.path
          d="M 120 325 L 110 380 L 100 440 L 100 470"
          stroke={colors.primary}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{ delay: 0.7 }}
        />
        <motion.path
          d="M 180 325 L 190 380 L 200 440 L 200 470"
          stroke={colors.primary}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.7, pathLength: 1 }}
          transition={{ delay: 0.7 }}
        />

        {/* Bio-Node: Brain with enhanced glow */}
        <g>
          <motion.circle
            cx="150"
            cy="60"
            r="8"
            fill={getNodeColor(bioNodes.brain)}
            opacity="0.9"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
          />
          <motion.circle
            cx="150"
            cy="60"
            r="8"
            fill="none"
            stroke={getNodeColor(bioNodes.brain)}
            strokeWidth="2"
            animate={{
              r: [8, 16, 8],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          {/* Brain neural connections */}
          {[...Array(6)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 6;
            return (
              <motion.line
                key={i}
                x1="150"
                y1="60"
                x2={150 + Math.cos(angle) * 15}
                y2={60 + Math.sin(angle) * 15}
                stroke={getNodeColor(bioNodes.brain)}
                strokeWidth="0.5"
                opacity="0.6"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3], pathLength: 1 }}
                transition={{
                  delay: 0.8 + i * 0.1,
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            );
          })}
        </g>

        {/* Bio-Node: Heart with pulse */}
        <g>
          <motion.circle
            cx="150"
            cy="200"
            r="10"
            fill={getNodeColor(bioNodes.heart)}
            opacity="0.9"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
          />
          <motion.circle
            cx="150"
            cy="200"
            r="10"
            fill="none"
            stroke={getNodeColor(bioNodes.heart)}
            strokeWidth="2"
            animate={{
              r: [10, 20, 10],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </g>

        {/* Bio-Node: Lungs (dual) */}
        <g>
          <motion.circle
            cx="120"
            cy="210"
            r="8"
            fill={getNodeColor(bioNodes.lungs)}
            opacity="0.8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ delay: 1.1, type: 'spring' }}
          />
          <motion.circle
            cx="180"
            cy="210"
            r="8"
            fill={getNodeColor(bioNodes.lungs)}
            opacity="0.8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ delay: 1.2, type: 'spring' }}
          />
        </g>

        {/* Energy particles flowing through body */}
        {[...Array(15)].map((_, i) => {
          const pathY = 140 + (i * 185) / 15;
          return (
            <motion.circle
              key={i}
              cx="150"
              cy={pathY}
              r="1.5"
              fill={colors.secondary}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                cy: [pathY, pathY + 20, pathY + 40],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'linear',
              }}
            />
          );
        })}

        {/* Scanning line effect */}
        <motion.line
          x1="80"
          x2="220"
          y1="150"
          y2="150"
          stroke={colors.secondary}
          strokeWidth="1"
          opacity="0.6"
          animate={{
            y1: [100, 400],
            y2: [100, 400],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Floating data points */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const radius = 100;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: colors.primary,
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
}