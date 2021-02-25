import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  //Context
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSuceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetCountdown();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei</button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSuceeded}
            >
              Completei
                        </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de level completando desafios.
                </p>
          </div>
        )}
    </div>

  )
}