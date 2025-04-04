'use client';

import { useState } from 'react';
import Timer from './components/Timer';

export default function Home() {
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(10);
  const [rounds, setRounds] = useState(8);
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState<'default' | 'soloLeveling'>('default');

  const handleStateChange = (running: boolean) => {
    setIsRunning(running);
  };

  const toggleTheme = () => {
    setTheme(theme === 'default' ? 'soloLeveling' : 'default');
  };

  // Définir les couleurs en fonction du thème
  const getThemeColors = () => {
    if (theme === 'soloLeveling') {
      return {
        backgroundColor: 'bg-gradient-to-br from-gray-900 to-black',
        cardBackground: 'bg-gray-800/80',
        textColor: 'text-gray-300',
        headingColor: 'text-purple-300',
        inputBorder: 'border-gray-700',
        inputFocus: 'focus:border-purple-500 focus:ring-purple-500',
        buttonColor: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
        shadowColor: 'shadow-purple-900/20',
      };
    } else {
      return {
        backgroundColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
        cardBackground: 'bg-white',
        textColor: 'text-gray-700',
        headingColor: 'text-indigo-800',
        inputBorder: 'border-indigo-200',
        inputFocus: 'focus:border-indigo-500 focus:ring-indigo-500',
        buttonColor: 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600',
        shadowColor: 'shadow-indigo-900/20',
      };
    }
  };

  const colors = getThemeColors();

  return (
    <main className={`min-h-screen ${colors.backgroundColor} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-5xl font-bold text-center mb-2 ${colors.headingColor} transition-colors duration-500`}>
          HIIT Timer
        </h1>
        <p className={`text-xl text-center mb-10 ${colors.textColor} transition-colors duration-500`}>
          Configurez votre entraînement par intervalles à haute intensité
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className={`p-6 rounded-xl shadow-lg ${colors.cardBackground} ${colors.shadowColor} transition-all duration-300 hover:shadow-xl`}>
            <h2 className={`text-xl font-semibold mb-4 ${colors.headingColor} transition-colors duration-500`}>Temps de travail</h2>
            <div className="flex items-center">
              <label htmlFor="workTime" className="sr-only">Temps de travail en secondes</label>
              <input
                id="workTime"
                type="number"
                value={workTime}
                onChange={(e) => setWorkTime(Number(e.target.value))}
                disabled={isRunning}
                min="5"
                max="300"
                aria-label="Temps de travail en secondes"
                className={`w-full p-3 rounded-lg border ${colors.inputBorder} ${colors.inputFocus} ${colors.textColor} bg-transparent transition-colors duration-300 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <span className={`ml-2 ${colors.textColor} transition-colors duration-500`}>secondes</span>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${colors.cardBackground} ${colors.shadowColor} transition-all duration-300 hover:shadow-xl`}>
            <h2 className={`text-xl font-semibold mb-4 ${colors.headingColor} transition-colors duration-500`}>Temps de repos</h2>
            <div className="flex items-center">
              <label htmlFor="restTime" className="sr-only">Temps de repos en secondes</label>
              <input
                id="restTime"
                type="number"
                value={restTime}
                onChange={(e) => setRestTime(Number(e.target.value))}
                disabled={isRunning}
                min="5"
                max="120"
                aria-label="Temps de repos en secondes"
                className={`w-full p-3 rounded-lg border ${colors.inputBorder} ${colors.inputFocus} ${colors.textColor} bg-transparent transition-colors duration-300 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <span className={`ml-2 ${colors.textColor} transition-colors duration-500`}>secondes</span>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${colors.cardBackground} ${colors.shadowColor} transition-all duration-300 hover:shadow-xl`}>
            <h2 className={`text-xl font-semibold mb-4 ${colors.headingColor} transition-colors duration-500`}>Nombre de rounds</h2>
            <div className="flex items-center">
              <label htmlFor="rounds" className="sr-only">Nombre de rounds</label>
              <input
                id="rounds"
                type="number"
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
                disabled={isRunning}
                min="1"
                max="20"
                aria-label="Nombre de rounds"
                className={`w-full p-3 rounded-lg border ${colors.inputBorder} ${colors.inputFocus} ${colors.textColor} bg-transparent transition-colors duration-300 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <span className={`ml-2 ${colors.textColor} transition-colors duration-500`}>rounds</span>
            </div>
          </div>
        </div>

        <div className={`p-3 md:p-8 rounded-2xl shadow-xl ${colors.cardBackground} ${colors.shadowColor} transition-all duration-300`}>
          <Timer 
            workTime={workTime} 
            restTime={restTime} 
            rounds={rounds} 
            onStateChange={handleStateChange}
            theme={theme}
          />
        </div>

        <footer className={`mt-16 text-center ${colors.textColor} transition-colors duration-500`}>
          <p>Créé avec ❤️ pour vos entraînements HIIT</p>
        </footer>
      </div>

      {/* Bouton de changement de thème en bas à droite */}
      <button
        onClick={toggleTheme}
        className={`z-50 fixed bottom-4 left-4 p-3 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${colors.buttonColor}`}
        aria-label={theme === 'default' ? 'Passer au thème SOLO LEVELING' : 'Passer au thème par défaut'}
      >
        {theme === 'default' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        )}
      </button>
    </main>
  );
}
