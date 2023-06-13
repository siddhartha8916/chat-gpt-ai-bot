import React from 'react'
import Head from 'next/head';
import RegisterUser from '../../components/RegisterUser';

const RegisterPage = () => {


  return (
    <>
       <Head>
        <title>AcademyAI - Register</title>
      </Head>
      <RegisterUser/>
    </>
    
  )
}

export default RegisterPage