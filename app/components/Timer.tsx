'use client';

import { useState, useEffect } from 'react';

interface TimerProps {
  workTime: number; // en secondes
  restTime: number; // en secondes
  rounds: number;
  onStateChange?: (isRunning: boolean) => void;
  theme: 'default' | 'soloLeveling';
}

export default function Timer({ workTime, restTime, rounds, onStateChange, theme }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isWorking, setIsWorking] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [showZero, setShowZero] = useState(false);

  // Effet pour mettre à jour le temps restant quand workTime ou restTime changent
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(isWorking ? workTime : restTime);
      setShowZero(false);
    }
  }, [workTime, restTime, isWorking, isRunning]);

  useEffect(() => {
    onStateChange?.(isRunning);
  }, [isRunning, onStateChange]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Afficher 00:00 pendant une seconde avant de passer à la phase suivante
      setShowZero(true);
      
      setTimeout(() => {
        if (isWorking) {
          setTimeLeft(restTime);
          setIsWorking(false);
          setShowZero(false);
        } else {
          if (currentRound < rounds) {
            setTimeLeft(workTime);
            setIsWorking(true);
            setCurrentRound((prev) => prev + 1);
            setShowZero(false);
          } else {
            setIsRunning(false);
            // Réinitialiser le timer
            setTimeLeft(workTime);
            setIsWorking(true);
            setCurrentRound(1);
            setShowZero(false);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeLeft, isWorking, currentRound, rounds, workTime, restTime, isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(workTime);
    setIsWorking(true);
    setCurrentRound(1);
    setIsRunning(false);
    setShowZero(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculer le pourcentage de progression
  const totalTime = isWorking ? workTime : restTime;
  const progress = showZero ? 100 : ((totalTime - timeLeft) / totalTime) * 100;
  const radius = 120; // Augmenter le rayon pour un plus grand cercle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Définir les couleurs en fonction du thème, de la phase et de l'état d'exécution
  const getThemeColors = () => {
    if (theme === 'soloLeveling') {
      return {
        backgroundColor: isRunning 
          ? (isWorking ? 'bg-gradient-to-br from-purple-900 to-blue-900' : 'bg-gradient-to-br from-blue-900 to-indigo-900') 
          : 'bg-gradient-to-br from-gray-900 to-black',
        textColor: isRunning 
          ? (isWorking ? 'text-purple-300' : 'text-blue-300') 
          : 'text-gray-300',
        buttonColor: isRunning 
          ? (isWorking ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700') 
          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
        workGradient: {
          start: '#9333ea', // purple-600
          end: '#2563eb',   // blue-600
        },
        restGradient: {
          start: '#2563eb', // blue-600
          end: '#4f46e5',   // indigo-600
        },
        defaultGradient: '#9333ea', // purple-600
        welcomeTextColor: 'text-purple-300',
      };
    } else {
      // Thème par défaut
      return {
        backgroundColor: isRunning 
          ? (isWorking ? 'bg-gradient-to-br from-rose-50 to-orange-50' : 'bg-gradient-to-br from-sky-50 to-indigo-50') 
          : 'bg-white',
        textColor: isRunning 
          ? (isWorking ? 'text-rose-700' : 'text-indigo-700') 
          : 'text-gray-700',
        buttonColor: isRunning 
          ? (isWorking ? 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600' : 'bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600') 
          : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600',
        workGradient: {
          start: '#f43f5e', // rose-500
          end: '#f97316',   // orange-500
        },
        restGradient: {
          start: '#0ea5e9', // sky-500
          end: '#6366f1',   // indigo-500
        },
        defaultGradient: '#6366f1', // indigo-500
        welcomeTextColor: 'text-indigo-800',
      };
    }
  };

  const colors = getThemeColors();
  
  // Définir les dégradés pour la barre de progression
  const progressGradient = isWorking 
    ? 'url(#workGradient)' 
    : 'url(#restGradient)';

  return (
    <div className={`flex flex-col w-full items-center justify-center p-10 transition-colors duration-500 ${colors.backgroundColor}`}>
      {/* Texte de phase au-dessus du cercle */}
      <div className={`text-4xl font-bold mb-6 ${isRunning ? colors.textColor : colors.welcomeTextColor} transition-colors duration-500`}>
        {isRunning ? (isWorking ? 'TRAVAIL' : 'REPOS') : 'Commence ta séance HIIT !'}
      </div>
      
      <div className="relative w-[400px] h-[400px] flex items-center justify-center">
        {/* Cercle de progression */}
        <svg className="absolute w-full h-full -rotate-90">
          {/* Définir les dégradés */}
          <defs>
            <linearGradient id="workGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.workGradient.start} />
              <stop offset="100%" stopColor={colors.workGradient.end} />
            </linearGradient>
            <linearGradient id="restGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.restGradient.start} />
              <stop offset="100%" stopColor={colors.restGradient.end} />
            </linearGradient>
          </defs>
          
          {/* Cercle de fond */}
          <circle
            cx="200"
            cy="200"
            r={radius}
            className={theme === 'soloLeveling' ? 'stroke-gray-700' : 'stroke-gray-200'}
            strokeWidth="20"
            fill="none"
          />
          
          {/* Cercle de progression */}
          <circle
            cx="200"
            cy="200"
            r={radius}
            fill="none"
            strokeWidth="20"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ 
              transition: 'stroke-dashoffset 0.5s ease-in-out',
              transformOrigin: 'center',
              stroke: isRunning ? progressGradient : colors.defaultGradient
            }}
          />
        </svg>
        
        {/* Timer */}
        <div className={`relative z-10 flex flex-col items-center justify-center w-[200px] h-[200px] ${theme === 'soloLeveling' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-full shadow-inner`}>
          <div className={`text-7xl font-bold ${colors.textColor}`}>
            {showZero ? '00:00' : formatTime(timeLeft)}
          </div>
          <div className={`text-xl mt-2 ${colors.textColor}`}>
            Round {currentRound}/{rounds}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-10">
        <button
          onClick={toggleTimer}
          className={`px-8 py-3 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${colors.buttonColor}`}
        >
          {isRunning ? 'Pause' : 'Démarrer'}
        </button>
        <button
          onClick={resetTimer}
          className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
} 