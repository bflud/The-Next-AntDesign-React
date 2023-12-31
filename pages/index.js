import Head from 'next/head'
import Image from 'next/image'
import MainComponents from '../src/components/MainComponents'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Usuário ADM</title>
        <meta name="description" content="Looplex user control" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainComponents />
    </div>
  )
}
