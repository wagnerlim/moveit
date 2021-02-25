import styles from '../styles/components/Profile.module.css'
export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/wagnerlim.png" alt="Wagner Lima" />
            <div>
                <strong>Wagner Lima</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>
        </div>

    );
}