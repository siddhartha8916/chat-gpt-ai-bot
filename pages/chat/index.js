import React from 'react'
import ChatSection from '../../components/ChatSection.tsx'
import Head from 'next/head'

const ChatPage = () => {
  return (
    <>
    <Head>
        <title>AcademyAI - ChatBot</title>
      </Head>
    <ChatSection/>
    </>
  )
}

export default ChatPage