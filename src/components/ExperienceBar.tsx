import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function Experiencebar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
  //O style foi definido inline porque ele é algo que vai mudar ele representa o tanto que vai subir a barra..
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>

        <div style={{ width: `${percentToNextLevel}%` }} />

        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentExperience} xp </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}