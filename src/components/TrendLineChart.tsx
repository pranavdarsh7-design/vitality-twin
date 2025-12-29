import { motion } from 'motion/react';
import { TrendingDown, Sparkles } from 'lucide-react';
import type { HealthData, Results } from '../App';

interface TrendLineChartProps {
  healthData: HealthData;
  results: Results;
}

export function TrendLineChart({ healthData, results }: TrendLineChartProps) {
  const currentYear = new Date().getFullYear();
  
  // Generate data points for the chart
  const generateDataPoints = () => {
    const points = [];
    const yearsToShow = 10;
    
    for (let i = 0; i <= yearsToShow; i++) {
      const year = currentYear + i;
      
      // Current path - aging accelerates
      const agingRate = Math.max(0, results.bioAge - healthData.chronologicalAge);
      const currentPathAge = results.bioAge + i * (1 + agingRate * 0.3);
      
      // Optimized path - slow aging
      const optimizedPathAge = Math.max(
        healthData.chronologicalAge,
        results.bioAge - 4.2 + i * 0.7
      );
      
      points.push({
        year,
        current: Math.round(currentPathAge * 10) / 10,
        optimized: Math.round(optimizedPathAge * 10) / 10,
      });
    }
    
    return points;
  };

  const dataPoints = generateDataPoints();
  const maxAge = Math.max(...dataPoints.map(p => p.current));
  const minAge = Math.min(...dataPoints.map(p => p.optimized));
  
  // Convert age values to Y coordinates (0-100 scale for display)
  const getY = (age: number) => {
    const range = maxAge - minAge + 10;
    return 100 - ((age - minAge + 5) / range) * 100;
  };

  // Generate SVG path for the line
  const generatePath = (type: 'current' | 'optimized') => {
    const points = dataPoints.map((point, index) => {
      const x = (index / (dataPoints.length - 1)) * 100;
      const y = getY(type === 'current' ? point.current : point.optimized);
      return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
    });
    return points.join(' ');
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-cyan-400" />
          Predicted Age Trajectory
        </h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-400" />
            <span className="text-slate-400">Current Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-emerald-400" />
            <span className="text-slate-400">With Optimization</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="rgb(51, 65, 85)"
              strokeWidth="0.2"
              opacity="0.3"
            />
          ))}

          {/* Area under optimized path */}
          <motion.path
            d={`${generatePath('optimized')} L 100,100 L 0,100 Z`}
            fill="url(#gradientOptimized)"
            opacity="0.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.3, duration: 1 }}
          />

          {/* Area under current path */}
          <motion.path
            d={`${generatePath('current')} L 100,100 L 0,100 Z`}
            fill="url(#gradientCurrent)"
            opacity="0.15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.2, duration: 1 }}
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradientCurrent" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradientOptimized" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Current path line */}
          <motion.path
            d={generatePath('current')}
            fill="none"
            stroke="#ef4444"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
          />

          {/* Optimized path line */}
          <motion.path
            d={generatePath('optimized')}
            fill="none"
            stroke="#10b981"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 1.5, ease: 'easeOut' }}
          />

          {/* Data points */}
          {dataPoints.map((point, index) => {
            const x = (index / (dataPoints.length - 1)) * 100;
            const yCurrent = getY(point.current);
            const yOptimized = getY(point.optimized);

            return (
              <g key={index}>
                {/* Current path point */}
                <motion.circle
                  cx={x}
                  cy={yCurrent}
                  r="0.8"
                  fill="#ef4444"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                />
                
                {/* Optimized path point */}
                <motion.circle
                  cx={x}
                  cy={yOptimized}
                  r="0.8"
                  fill="#10b981"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                />
              </g>
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-slate-500">
          <span>{currentYear}</span>
          <span>{currentYear + 5}</span>
          <span>{currentYear + 10}</span>
        </div>

        {/* Y-axis label */}
        <div className="absolute -left-12 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500">
          <span>{Math.round(maxAge)}</span>
          <span>{Math.round((maxAge + minAge) / 2)}</span>
          <span>{Math.round(minAge)}</span>
        </div>
      </div>

      {/* Insight */}
      <motion.div
        className="mt-8 bg-cyan-900/20 backdrop-blur-lg rounded-xl p-4 border border-cyan-700/30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300">
            Following your Dubai Prescription could keep you <span className="font-bold text-emerald-400">
            {Math.round((dataPoints[dataPoints.length - 1].current - dataPoints[dataPoints.length - 1].optimized) * 10) / 10} years younger
            </span> biologically by {currentYear + 10}.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
