import Head from 'next/head'

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { Experiencebar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile"
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';




export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it </title>
      </Head>

      <Experiencebar />

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
  )
}
