import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const { activeChallenge, failedChallenge, completeChallenge } = useContext(ChallengesContext);
  //Context
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSuceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    failedChallenge();
    resetCountdown();
  }
//Fiz mudanças no header adicionando className para mudar o style no css e adicionei um outro para falar o quanto o usuario perderá de exp
  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          
          <header className={styles.challengeSucceededText}>Ganhe {activeChallenge.amount} xp</header>
          <header className={styles.challengeFailText}>Se falhar perderá {activeChallenge.amount / 2} xp</header>

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