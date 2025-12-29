import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ProjectionScreen } from './components/ProjectionScreen';
import { QuestsScreen } from './components/QuestsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { HealthPassportScreen } from './components/HealthPassportScreen';
import { MarketplaceScreen } from './components/MarketplaceScreen';
import { FutureSelfScreen } from './components/FutureSelfScreen';
import { LabScannerScreen } from './components/LabScannerScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { BottomNav } from './components/BottomNav';

export interface HealthData {
  chronologicalAge: number;
  sleep: number;
  vitaminD: 'low' | 'normal' | 'high';
  steps: number;
  stress: 'low' | 'medium' | 'high';
  uvExposure: 'low' | 'moderate' | 'high';
  hydration: 'poor' | 'good' | 'excellent';
}

export interface Results {
  bioAge: number;
  vitalityScore: number;
  prediction: string;
  dubaiPrescription: string;
  healthStatus: 'healthy' | 'average' | 'unhealthy';
  actionableTriumphs: string[];
  yearsGainedOrLost: number;
  bioNodes: {
    heart: 'good' | 'warning' | 'critical';
    brain: 'good' | 'warning' | 'critical';
    lungs: 'good' | 'warning' | 'critical';
  };
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [screen, setScreen] = useState<'onboarding' | 'loading' | 'dashboard' | 'projection' | 'quests' | 'profile' | 'passport' | 'marketplace' | 'future' | 'scanner'>('onboarding');
  const [activeTab, setActiveTab] = useState<'home' | 'insights' | 'quests' | 'profile'>('home');
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [results, setResults] = useState<Results | null>(null);
  
  // Gamification State
  const [questStreak, setQuestStreak] = useState(3); // Days in a row
  const [totalQuestsCompleted, setTotalQuestsCompleted] = useState(7);
  const [goldProgress, setGoldProgress] = useState(35); // Percentage toward 1g gold bar

  const calculateResults = (data: HealthData): Results => {
    let bioAge = data.chronologicalAge;
    let vitalityScore = 100;

    // Apply rules
    if (data.sleep < 6) {
      bioAge += 2;
      vitalityScore -= 10;
    } else if (data.sleep < 7) {
      bioAge += 0.5;
      vitalityScore -= 5;
    }

    if (data.vitaminD === 'low') {
      bioAge += 1.5;
      vitalityScore -= 12;
    }

    if (data.steps > 10000) {
      bioAge -= 3;
      vitalityScore += 5;
    } else if (data.steps < 5000) {
      bioAge += 1;
      vitalityScore -= 15;
    }

    if (data.stress === 'high') {
      vitalityScore -= 15;
      bioAge += 1;
    } else if (data.stress === 'medium') {
      vitalityScore -= 8;
      bioAge += 0.5;
    }

    if (data.uvExposure === 'high') {
      bioAge += 0.5;
      vitalityScore -= 5;
    }

    if (data.hydration === 'poor') {
      bioAge += 0.5;
      vitalityScore -= 8;
    } else if (data.hydration === 'excellent') {
      vitalityScore += 3;
    }

    // Ensure score stays within bounds
    vitalityScore = Math.max(0, Math.min(100, vitalityScore));

    // Determine health status
    let healthStatus: 'healthy' | 'average' | 'unhealthy';
    if (vitalityScore >= 75) healthStatus = 'healthy';
    else if (vitalityScore >= 50) healthStatus = 'average';
    else healthStatus = 'unhealthy';

    // Calculate years gained or lost
    const yearsGainedOrLost = data.chronologicalAge - bioAge;

    // Determine bio nodes status
    const bioNodes = {
      heart: data.steps > 8000 ? 'good' : data.steps > 5000 ? 'warning' : 'critical',
      brain: data.sleep >= 7 ? 'good' : data.sleep >= 6 ? 'warning' : 'critical',
      lungs: data.stress === 'low' ? 'good' : data.stress === 'medium' ? 'warning' : 'critical',
    } as const;

    // Generate prediction
    const ageDiff = bioAge - data.chronologicalAge;
    let prediction = '';
    if (ageDiff > 2) {
      prediction = `Without intervention, your current lifestyle patterns could accelerate cellular aging by ${Math.round(ageDiff * 3)} additional years by 2035. Dubai's intense heat and indoor lifestyle are contributing factors—focus on Vitamin D optimization and consistent hydration to prevent premature metabolic dysfunction.`;
    } else if (ageDiff < -1) {
      prediction = `Your habits are exceptional! By 2035, you could maintain the biological resilience of someone ${Math.abs(Math.round(ageDiff * 2))} years younger. Continue optimizing for Dubai's climate with early morning activity and strategic sun exposure to preserve peak vitality.`;
    } else {
      prediction = `You're aging at a normal rate, but strategic optimizations could shift you into accelerated longevity territory. By optimizing Vitamin D and deep sleep, you can reclaim 4.2 years of cellular health by 2035.`;
    }

    // Dubai-specific prescription
    const prescriptions = [
      'Visit Cryotherapy Dubai in JLT for a 3-minute -110°C session to boost cellular recovery and reduce inflammation.',
      'Join the sunrise outdoor yoga sessions at Kite Beach (6:00 AM) to maximize Vitamin D absorption during cooler hours.',
      'Book a Himalayan salt cave session at Talise Spa to improve respiratory health and combat indoor air quality issues.',
      'Take morning walks through Mushrif Park\'s shaded trails between 6-7 AM when UV index is below 3.',
      'Try the NAD+ IV therapy at Nova Clinic Dubai Healthcare City to support cellular energy and longevity.',
      'Visit the wellness hub at Museum of the Future for biometric screening and personalized longevity insights.',
    ];

    let dubaiPrescription = '';
    if (data.vitaminD === 'low') {
      dubaiPrescription = prescriptions[1];
    } else if (data.stress === 'high') {
      dubaiPrescription = prescriptions[2];
    } else if (data.steps < 5000) {
      dubaiPrescription = prescriptions[3];
    } else {
      dubaiPrescription = prescriptions[Math.floor(Math.random() * prescriptions.length)];
    }

    // Actionable triumphs
    const actionableTriumphs = [];
    if (data.sleep < 7) {
      actionableTriumphs.push('Set a 10 PM screen-off alarm tonight and aim for 7.5 hours of sleep in a cool room (18-20°C).');
    }

    if (data.vitaminD === 'low') {
      actionableTriumphs.push('Get 15 minutes of early morning sun exposure (before 9 AM) and supplement with 4000 IU Vitamin D3 daily.');
    }

    if (data.steps < 10000) {
      actionableTriumphs.push('Add a 15-minute evening walk after dinner in air-conditioned malls during peak heat hours.');
    }

    if (data.hydration === 'poor') {
      actionableTriumphs.push('Drink 3L of water daily—Dubai\'s dry climate increases dehydration risk by 40%.');
    }

    return {
      bioAge: Math.round(bioAge * 10) / 10,
      vitalityScore: Math.round(vitalityScore),
      prediction,
      dubaiPrescription,
      healthStatus,
      actionableTriumphs,
      yearsGainedOrLost,
      bioNodes,
    };
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSubmit = (data: HealthData) => {
    setHealthData(data);
    setScreen('loading');
    
    // Simulate AI processing
    setTimeout(() => {
      const calculatedResults = calculateResults(data);
      setResults(calculatedResults);
      setScreen('dashboard');
      setActiveTab('home');
    }, 2500);
  };

  const handleNavChange = (tab: 'home' | 'insights' | 'quests' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') setScreen('dashboard');
    if (tab === 'insights') setScreen('projection');
    if (tab === 'quests') setScreen('quests');
    if (tab === 'profile') setScreen('profile');
  };

  const handleReset = () => {
    setScreen('onboarding');
    setHealthData(null);
    setResults(null);
    setActiveTab('home');
  };

  const navigateTo = (destination: 'passport' | 'marketplace' | 'future' | 'scanner' | 'dashboard') => {
    setScreen(destination);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.15),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {screen === 'onboarding' && <OnboardingScreen onSubmit={handleSubmit} onNavigate={navigateTo} />}
        {screen === 'loading' && <LoadingScreen />}
        {screen === 'dashboard' && healthData && results && (
          <DashboardScreen 
            healthData={healthData} 
            results={results}
            onReset={handleReset}
            onNavigate={navigateTo}
            isGuestMode={isGuestMode}
            questStreak={questStreak}
            totalQuestsCompleted={totalQuestsCompleted}
            goldProgress={goldProgress}
          />
        )}
        {screen === 'projection' && healthData && results && (
          <ProjectionScreen 
            healthData={healthData} 
            results={results}
          />
        )}
        {screen === 'quests' && results && (
          <QuestsScreen results={results} />
        )}
        {screen === 'profile' && healthData && results && (
          <ProfileScreen 
            healthData={healthData}
            results={results}
            onNavigate={navigateTo}
            onLogout={() => setIsLoggedIn(false)}
          />
        )}
        {screen === 'passport' && healthData && (
          <HealthPassportScreen 
            healthData={healthData}
            onBack={() => setScreen('profile')}
          />
        )}
        {screen === 'marketplace' && results && (
          <MarketplaceScreen 
            results={results}
            onBack={() => setScreen('profile')}
          />
        )}
        {screen === 'future' && healthData && results && (
          <FutureSelfScreen 
            healthData={healthData}
            results={results}
            onBack={() => setScreen('dashboard')}
          />
        )}
        {screen === 'scanner' && (
          <LabScannerScreen onBack={() => setScreen('profile')} />
        )}

        {/* Bottom Navigation */}
        {(screen === 'dashboard' || screen === 'projection' || screen === 'quests' || screen === 'profile') && (
          <BottomNav activeTab={activeTab} onTabChange={handleNavChange} />
        )}
      </div>
    </div>
  );
}