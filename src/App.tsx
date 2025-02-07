import React, { useState, useEffect } from 'react';
import { Skull, Clock, Calendar, Skull as SkullIcon } from 'lucide-react';

interface UserData {
  name: string;
  birthDate: string;
  deathTimer: number;
  causeOfDeath: string;
}

const DEATH_CAUSES = [
  "Infarto agudo do miocárdio durante o sono",
  "Acidente vascular cerebral hemorrágico",
  "Complicações de câncer metastático",
  "Parada cardiorrespiratória após arritmia grave",
  "Embolia pulmonar massiva",
  "Aneurisma cerebral rompido",
  "Insuficiência hepática terminal",
  "Septicemia após infecção hospitalar",
  "Complicações de pneumonia grave",
  "Insuficiência renal crônica terminal",
  "Hemorragia interna após trauma",
  "Complicações de diabetes não controlada",
  "Overdose acidental de medicamentos",
  "Choque anafilático grave",
  "Falência múltipla dos órgãos",
  "Complicações pós-operatórias",
  "Trombose venosa profunda fatal",
  "Ruptura de aneurisma da aorta",
  "Edema pulmonar agudo",
  "Meningite bacteriana fulminante",
  "Pancreatite aguda necrosante",
  "Cirrose hepática descompensada",
  "Choque cardiogênico",
  "Broncopneumonia grave",
  "Insuficiência cardíaca congestiva",
  "Hemorragia subaracnóidea",
  "Tromboembolismo pulmonar",
  "Síndrome da angústia respiratória aguda",
  "Choque séptico refratário",
  "Infecção generalizada resistente"
];

function generateDeathTimer(): number {
  return Math.floor(Math.random() * (100000 - 1000) + 1000);
}

function formatTime(hours: number) {
  const totalSeconds = Math.floor(hours * 3600);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const days = (hours / 24).toFixed(1);

  return { h, m, s, days };
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({ name: '', birthDate: '' });
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const savedData = localStorage.getItem('deathTimerData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserData(data);
      setRemainingTime(data.deathTimer);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const interval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 0) return 0;
          return prev - 1/3600;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('deathTimerData', JSON.stringify({
        ...userData,
        deathTimer: remainingTime
      }));
    }
  }, [remainingTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deathTimer = generateDeathTimer();
    const causeOfDeath = DEATH_CAUSES[Math.floor(Math.random() * DEATH_CAUSES.length)];
    
    const newUserData = {
      ...formData,
      deathTimer,
      causeOfDeath
    };

    setUserData(newUserData);
    setRemainingTime(deathTimer);
    localStorage.setItem('deathTimerData', JSON.stringify(newUserData));
  };

  if (userData) {
    const { h, m, s, days } = formatTime(remainingTime);
    
    return (
      <div className="min-h-screen bg-black text-red-600 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background blood rain */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] bg-red-600/20"
              style={{
                left: `${(i * 1.7) + (Math.random() * 2)}%`,
                height: `${Math.random() * 20 + 10}%`,
                animation: `bloodfall ${Math.random() * 1.5 + 1}s linear infinite`,
                animationDelay: `-${Math.random() * 2}s`,
                opacity: 0.2 + (Math.random() * 0.3),
              }}
            />
          ))}
        </div>

        {/* Multiple lightning layers */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="fixed inset-0 bg-red-900/5 pointer-events-none animate-lightning"
            style={{ animationDelay: `${i * -1}s` }}
          />
        ))}

        {/* Blood texture overlay */}
        <div className="fixed inset-0 blood-texture opacity-50 pointer-events-none" />

        {/* Corner decorations */}
        <div className="fixed top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-red-800/50 rounded-tl-3xl" />
        <div className="fixed top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-red-800/50 rounded-tr-3xl" />
        <div className="fixed bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-red-800/50 rounded-bl-3xl" />
        <div className="fixed bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-red-800/50 rounded-br-3xl" />

        <div className="max-w-md w-full relative z-10">
          <div className="relative border-2 border-red-800 p-8 rounded-lg animate-pulse-shadow bg-gradient-to-b from-black via-red-950/20 to-black">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="relative">
                <Skull className="w-16 h-16 animate-pulse text-red-600" />
                <div className="absolute inset-0 animate-flicker">
                  <Skull className="w-16 h-16 text-red-700 blur-[1px]" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-center mb-8 mt-4 font-serif animate-flicker">
              Contador da Morte de {userData.name}
            </h1>
            
            <div className="death-timer mb-8 text-center">
              <div className="text-5xl font-mono font-bold animate-pulse bg-gradient-to-b from-red-500 to-red-800 bg-clip-text text-transparent">
                {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
              </div>
              <div className="text-sm opacity-80 mt-2">Tempo Restante</div>
              <div className="text-xl mt-4 font-semibold">
                {days} dias restantes
              </div>
            </div>

            <div className="cause-of-death p-6 border border-red-800/50 rounded-lg bg-gradient-to-b from-black/90 to-red-950/20 backdrop-blur text-center relative">
              <div className="absolute inset-0 bg-red-900/5 rounded-lg animate-pulse" />
              <h2 className="text-xl font-semibold mb-3 relative z-10">Causa da Morte</h2>
              <p className="italic text-red-400 relative z-10 text-lg">{userData.causeOfDeath}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-red-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects from above */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] bg-red-600/20"
            style={{
              left: `${(i * 1.7) + (Math.random() * 2)}%`,
              height: `${Math.random() * 20 + 10}%`,
              animation: `bloodfall ${Math.random() * 1.5 + 1}s linear infinite`,
              animationDelay: `-${Math.random() * 2}s`,
              opacity: 0.2 + (Math.random() * 0.3),
            }}
          />
        ))}
      </div>

      {/* Multiple lightning layers */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="fixed inset-0 bg-red-900/5 pointer-events-none animate-lightning"
          style={{ animationDelay: `${i * -1}s` }}
        />
      ))}

      {/* Blood texture overlay */}
      <div className="fixed inset-0 blood-texture opacity-50 pointer-events-none" />

      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-red-800/50 rounded-tl-3xl" />
      <div className="fixed top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-red-800/50 rounded-tr-3xl" />
      <div className="fixed bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-red-800/50 rounded-bl-3xl" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-red-800/50 rounded-br-3xl" />

      <div className="max-w-md w-full relative z-10">
        <form onSubmit={handleSubmit} className="relative border-2 border-red-800 p-8 rounded-lg animate-pulse-shadow bg-gradient-to-b from-black via-red-950/20 to-black">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="relative">
              <SkullIcon className="w-16 h-16 animate-pulse text-red-600" />
              <div className="absolute inset-0 animate-flicker">
                <SkullIcon className="w-16 h-16 text-red-700 blur-[1px]" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-8 mt-4 font-serif animate-flicker">Descubra Seu Destino</h1>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Seu Nome
              </span>
            </label>
            <input
              type="text"
              required
              className="w-full bg-black/80 border border-red-800 rounded p-3 text-red-500 focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-red-900"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Data de Nascimento
              </span>
            </label>
            <input
              type="date"
              required
              className="w-full bg-black/80 border border-red-800 rounded p-3 text-red-500 focus:outline-none focus:ring-1 focus:ring-red-600"
              value={formData.birthDate}
              onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-b from-red-900 to-red-950 hover:from-red-800 hover:to-red-900 text-white py-3 px-4 rounded transition-colors duration-300 font-semibold text-lg shadow-lg shadow-red-900/50"
          >
            Revelar Seu Destino
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;