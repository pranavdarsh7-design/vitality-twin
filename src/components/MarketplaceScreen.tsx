import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Gift, ShoppingBag, Sparkles, ExternalLink } from 'lucide-react';
import type { Results } from '../App';

interface MarketplaceScreenProps {
  results: Results;
  onBack: () => void;
}

export function MarketplaceScreen({ results, onBack }: MarketplaceScreenProps) {
  const offers = [
    {
      provider: 'AXA Insurance',
      type: 'Health Insurance',
      discount: '15%',
      title: 'Premium Health Insurance Discount',
      description: 'Your Vitality Score of ' + results.vitalityScore + ' qualifies you for a premium discount on your next renewal.',
      minScore: 75,
      color: 'from-blue-500 to-cyan-500',
      value: 'AED 2,400/year savings',
    },
    {
      provider: 'Daman Insurance',
      type: 'Life Insurance',
      discount: '12%',
      title: 'Enhanced Life Coverage Discount',
      description: 'Biological age ' + Math.round(results.bioAge) + ' years vs chronological age—lower premiums available.',
      minScore: 65,
      color: 'from-emerald-500 to-teal-500',
      value: 'AED 1,800/year savings',
    },
    {
      provider: 'Dubai Gold Souq',
      type: 'Wellness Reward',
      discount: '1g Gold',
      title: 'Gold Vitality Reward',
      description: 'Maintain 80+ Vitality Score for 3 consecutive months to claim your 1g gold bar reward.',
      minScore: 80,
      color: 'from-amber-500 to-yellow-500',
      value: 'Worth AED 240',
    },
  ];

  const vouchers = [
    { name: 'DHA Free Health Screening', value: 'AED 500', status: 'available' },
    { name: 'Talise Spa 50% Off', value: 'AED 300', status: 'available' },
    { name: 'Fitness First 1-Month Free', value: 'AED 450', status: 'claimed' },
    { name: 'Nova Clinic NAD+ Therapy 30% Off', value: 'AED 600', status: 'available' },
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Vitality Marketplace
            </h1>
            <p className="text-sm text-slate-400">Unlock rewards with your health achievements</p>
          </div>
        </motion.div>

        {/* Congrats Banner */}
        <motion.div
          className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-700/40 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-2 text-purple-300">Congratulations!</h3>
              <p className="text-slate-300 leading-relaxed">
                Your Vitality Score is <span className="font-bold text-purple-400">{results.vitalityScore}</span>. 
                You have unlocked exclusive health insurance discounts and wellness rewards from our Dubai partners!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Insurance Offers */}
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          Dynamic Insurance Discounts
        </h3>

        <div className="space-y-4 mb-8">
          {offers.map((offer, index) => {
            const isQualified = results.vitalityScore >= offer.minScore;
            return (
              <motion.div
                key={index}
                className={`bg-slate-900/40 backdrop-blur-xl border rounded-2xl p-6 ${
                  isQualified ? 'border-slate-800/50' : 'border-slate-800/30 opacity-60'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${offer.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <span className="text-2xl font-bold text-white">{offer.discount}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-lg text-white mb-1">{offer.title}</h4>
                        <p className="text-sm text-slate-400">{offer.provider} • {offer.type}</p>
                      </div>
                      {isQualified && (
                        <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs text-emerald-400 font-semibold">
                          QUALIFIED
                        </div>
                      )}
                      {!isQualified && (
                        <div className="px-3 py-1 bg-slate-700/30 border border-slate-600/30 rounded-full text-xs text-slate-500 font-semibold">
                          Score {offer.minScore}+ required
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{offer.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-cyan-400">{offer.value}</span>
                      {isQualified && (
                        <motion.button
                          className={`bg-gradient-to-r ${offer.color} text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:shadow-lg transition-all`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Claim Offer
                          <ExternalLink className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Wellness Vouchers */}
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-emerald-400" />
          Available Vouchers
        </h3>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {vouchers.map((voucher, index) => {
            const isClaimed = voucher.status === 'claimed';
            return (
              <motion.div
                key={index}
                className={`bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-xl p-5 ${
                  isClaimed ? 'opacity-60' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={!isClaimed ? { scale: 1.02 } : {}}
              >
                <div className="flex items-start justify-between mb-3">
                  <ShoppingBag className={`w-5 h-5 ${isClaimed ? 'text-slate-600' : 'text-emerald-400'}`} />
                  {isClaimed ? (
                    <div className="px-2 py-1 bg-slate-700/30 rounded-full text-xs text-slate-500">
                      Claimed
                    </div>
                  ) : (
                    <div className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs text-emerald-400">
                      Available
                    </div>
                  )}
                </div>
                <h4 className="font-semibold text-white mb-2">{voucher.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyan-400 font-semibold">Value: {voucher.value}</span>
                  {!isClaimed && (
                    <motion.button
                      className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Redeem
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info */}
        <motion.div
          className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">How It Works</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Maintain or improve your Vitality Score to unlock better insurance rates and exclusive wellness vouchers. 
                Partners include DHA-certified providers, major insurance companies, and premium Dubai wellness centers. 
                All discounts are verified and automatically applied based on your real-time health data.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
