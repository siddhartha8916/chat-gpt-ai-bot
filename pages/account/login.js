import Navbar from '../../components/Navbar';
import LoginUser from '../../components/LoginUser';
import Head from 'next/head';


const LoginPage = () => {

  return (
    <>
      <Head>
        <title>AcademyAI - Login</title>
      </Head>
      <LoginUser />
    </>
  )
}

export default LoginPage