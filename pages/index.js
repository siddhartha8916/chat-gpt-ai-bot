import Head from 'next/head'
import Navbar from '../components/Navbar'
import Script from 'next/script'
import HeroSection from '../components/HeroSection'

export default function Home() {
  return (
    <div>
      <Head>
        <title>OpenAI ChatBot</title>
        <meta name="description" content="OpenAI ChatBot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <HeroSection/>
    </div>
  )
}
