import { motion } from 'motion/react';
import { ArrowLeft, Camera, Upload, Sparkles, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useState } from 'react';

interface LabScannerScreenProps {
  onBack: () => void;
}

interface BiomarkerData {
  biomarker: string;
  value: string;
  status: 'good' | 'warning' | 'low';
  highlighted: boolean;
  normalRange?: string;
}

export function LabScannerScreen({ onBack }: LabScannerScreenProps) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<BiomarkerData[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        processLabReport();
      };
      reader.readAsDataURL(file);
    }
  };

  const processLabReport = () => {
    setScanning(true);
    
    // Simulate AI processing with realistic analysis
    setTimeout(() => {
      // Generate realistic biomarker data based on "AI analysis"
      const extractedBiomarkers: BiomarkerData[] = [
        {
          biomarker: 'Vitamin D (25-OH)',
          value: `${Math.floor(Math.random() * 25) + 10} ng/mL`,
          status: Math.random() > 0.6 ? 'low' : 'warning',
          highlighted: true,
          normalRange: '30-100 ng/mL'
        },
        {
          biomarker: 'Cortisol (Morning)',
          value: `${Math.floor(Math.random() * 8) + 18} μg/dL`,
          status: Math.random() > 0.5 ? 'warning' : 'good',
          highlighted: Math.random() > 0.5,
          normalRange: '6-23 μg/dL'
        },
        {
          biomarker: 'Total Cholesterol',
          value: `${Math.floor(Math.random() * 50) + 170} mg/dL`,
          status: Math.random() > 0.7 ? 'warning' : 'good',
          highlighted: false,
          normalRange: '<200 mg/dL'
        },
        {
          biomarker: 'Fasting Glucose',
          value: `${Math.floor(Math.random() * 20) + 85} mg/dL`,
          status: 'good',
          highlighted: false,
          normalRange: '70-100 mg/dL'
        },
        {
          biomarker: 'Hemoglobin A1c',
          value: `${(Math.random() * 1 + 5).toFixed(1)}%`,
          status: 'good',
          highlighted: false,
          normalRange: '<5.7%'
        },
        {
          biomarker: 'TSH',
          value: `${(Math.random() * 2 + 1).toFixed(2)} mIU/L`,
          status: 'good',
          highlighted: false,
          normalRange: '0.4-4.0 mIU/L'
        },
        {
          biomarker: 'C-Reactive Protein',
          value: `${(Math.random() * 3 + 0.5).toFixed(1)} mg/L`,
          status: Math.random() > 0.7 ? 'warning' : 'good',
          highlighted: Math.random() > 0.6,
          normalRange: '<3.0 mg/L'
        },
        {
          biomarker: 'Iron',
          value: `${Math.floor(Math.random() * 80) + 60} μg/dL`,
          status: 'good',
          highlighted: false,
          normalRange: '60-170 μg/dL'
        },
      ];

      setScannedData(extractedBiomarkers);
      setScanning(false);
      setScanned(true);
    }, 3500);
  };

  const getAIRecommendations = () => {
    const lowVitaminD = scannedData.find(d => d.biomarker.includes('Vitamin D') && d.status === 'low');
    const highCortisol = scannedData.find(d => d.biomarker.includes('Cortisol') && d.status === 'warning');
    const concerningItems = scannedData.filter(d => d.highlighted);

    let recommendations = [];

    if (lowVitaminD) {
      recommendations.push({
        icon: '☀️',
        text: 'Vitamin D deficiency detected. Get 15-20 minutes of early morning sun (6-8 AM) and supplement with 4000 IU D3 daily.'
      });
    }

    if (highCortisol) {
      recommendations.push({
        icon: '🧘',
        text: 'Elevated cortisol suggests chronic stress. Try daily meditation, breathing exercises, or book a session at Talise Spa.'
      });
    }

    if (concerningItems.length > 0) {
      recommendations.push({
        icon: '💊',
        text: `${concerningItems.length} biomarkers need attention. Consider booking a follow-up consultation with a DHA-certified physician.`
      });
    }

    recommendations.push({
      icon: '📊',
      text: 'Your lab data has been integrated into your Vitality Twin for personalized health tracking.'
    });

    return recommendations;
  };

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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
              AI Lab Report Scanner
            </h1>
            <p className="text-sm text-slate-400">Multi-modal document analysis • Instant insights</p>
          </div>
        </motion.div>

        {!scanned && !scanning && (
          <>
            {/* Upload Area */}
            <motion.label
              htmlFor="file-upload"
              className="block bg-slate-900/40 backdrop-blur-xl border-2 border-dashed border-slate-700/50 rounded-3xl p-12 mb-6 text-center hover:border-cyan-500/50 transition-all cursor-pointer group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <input
                id="file-upload"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 mb-6 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all"
                whileHover={{ rotate: 10 }}
              >
                <Upload className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="font-semibold text-xl mb-2">Upload Lab Report</h3>
              <p className="text-slate-400 mb-4">
                Drag and drop your blood test PDF or photo here, or click to browse
              </p>
              <p className="text-xs text-slate-500">Supports PDF, JPG, PNG • Max 10MB</p>
            </motion.label>

            {/* Camera Option */}
            <motion.label
              htmlFor="camera-upload"
              className="block w-full bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.01 }}
            >
              <input
                id="camera-upload"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex items-center justify-center gap-3">
                <Camera className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Take Photo with Camera</span>
              </div>
            </motion.label>

            {/* Info */}
            <motion.div
              className="mt-6 bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-400 mb-2">How AI Analysis Works</h4>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li>• AI scans and extracts biomarker values from your lab report using OCR + computer vision</li>
                    <li>• Highlights concerning levels (Vitamin D, Cortisol, Glucose, etc.) based on medical standards</li>
                    <li>• Compares against Dubai-specific health baselines (90% Vitamin D deficiency rate)</li>
                    <li>• Generates personalized recommendations tailored to UAE climate</li>
                    <li>• Integrates findings with your Vitality Twin for comprehensive tracking</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {scanning && (
          <motion.div
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="relative inline-block mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <FileText className="w-16 h-16 text-emerald-400" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-4">AI Scanning Document...</h2>
            <p className="text-slate-400 mb-6">Analyzing biomarkers and extracting health data</p>

            {/* Scanning animation */}
            {uploadedImage && (
              <div className="relative h-64 bg-slate-950/50 rounded-xl overflow-hidden mb-6">
                <img 
                  src={uploadedImage} 
                  alt="Lab report" 
                  className="w-full h-full object-contain opacity-30 blur-sm"
                />
                <motion.div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                  animate={{ y: [0, 256, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 opacity-20">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-16 h-4 bg-slate-700 rounded" />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <motion.p
                className="text-sm text-slate-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✓ Document recognized...
              </motion.p>
              <motion.p
                className="text-sm text-slate-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: 0.7, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✓ Extracting biomarkers via OCR...
              </motion.p>
              <motion.p
                className="text-sm text-slate-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✓ Analyzing against UAE health standards...
              </motion.p>
            </div>
          </motion.div>
        )}

        {scanned && (
          <>
            {/* Success Banner */}
            <motion.div
              className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 backdrop-blur-xl border border-emerald-700/40 rounded-2xl p-6 mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">Scan Complete!</h3>
              </div>
              <p className="text-sm text-slate-300">
                Successfully extracted {scannedData.length} biomarkers from your lab report. 
                {scannedData.filter(d => d.highlighted).length} items need attention.
              </p>
            </motion.div>

            {/* Scanned Results */}
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Extracted Biomarkers
            </h3>

            <div className="space-y-3 mb-6">
              {scannedData.map((item, index) => {
                const getStatusIcon = () => {
                  if (item.status === 'good') return <CheckCircle className="w-5 h-5 text-emerald-400" />;
                  return <AlertCircle className="w-5 h-5 text-amber-400" />;
                };

                const getStatusColor = () => {
                  if (item.status === 'good') return 'border-slate-800/50';
                  if (item.status === 'warning') return 'border-amber-500/30 bg-amber-900/10';
                  return 'border-red-500/30 bg-red-900/10';
                };

                return (
                  <motion.div
                    key={index}
                    className={`bg-slate-900/40 backdrop-blur-xl border rounded-xl p-4 ${getStatusColor()} ${
                      item.highlighted ? 'ring-2 ring-cyan-500/30' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getStatusIcon()}
                        <div>
                          <h4 className="font-semibold text-white">{item.biomarker}</h4>
                          <p className="text-xs text-slate-500">Normal: {item.normalRange}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-cyan-400">{item.value}</p>
                        {item.highlighted && (
                          <p className="text-xs text-amber-400">⚠️ Attention</p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 uppercase font-semibold">
                      Status: {item.status === 'good' ? '✓ Normal' : item.status === 'warning' ? '⚠ Monitor' : '❌ Low'}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* AI Recommendations */}
            <motion.div
              className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-purple-700/30 rounded-2xl p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-purple-300 mb-2">AI-Powered Recommendations</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Based on your lab results and Dubai's climate factors, here are personalized action items:
                  </p>
                  <div className="space-y-3">
                    {getAIRecommendations().map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-lg">{rec.icon}</span>
                        <span>{rec.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.button
                onClick={() => {
                  setScanned(false);
                  setScanning(false);
                  setUploadedImage(null);
                  setScannedData([]);
                }}
                className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 py-3 rounded-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Scan Another Report
              </motion.button>
              <motion.button
                onClick={onBack}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Profile
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
