import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json'
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';



interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengsContextData {
  level: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  currentExperience: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  levelUp: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  //implemente a função failedChallenge aqui
  failedChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChalllengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}



export const ChallengesContext = createContext({} as ChallengsContextData);

export function ChallengesProvider({ children, ...rest }: ChalllengesProviderProps) {

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function levelDown() {
    setLevel(level - 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play;

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🦾', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }
  //Parte da mudança que fiz para a perca de exp
  function failedChallenge() {
    const { amount } = activeChallenge;
    let loseExp = amount / 2;

    let finalExperience = currentExperience - loseExp;

    if (finalExperience <= 0 && level > 1) {
      finalExperience = finalExperience * (-1);
      setCurrentExperience(finalExperience);
      resetChallenge();
      levelDown();
    } else if (level == 1) {
      resetChallenge();
      if (finalExperience <= 0) {
        setCurrentExperience(0);
      }
      else
        setCurrentExperience(finalExperience);
    } else
      setCurrentExperience(finalExperience);
    resetChallenge();

  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        //e aqui também
        failedChallenge,
        closeLevelUpModal

      }}
    >
      {children}
      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}