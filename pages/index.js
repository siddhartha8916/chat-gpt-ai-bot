import Head from 'next/head'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'

export default function Home() {
  return (
    <div>
      <Head>
        <title>AcademyAI</title>
        <meta name="description" content="AcademyAI ChatBot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <HeroSection/>
    </div>
  )
}
