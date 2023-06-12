import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';


const Login = () => {

  function handleSubmit({ username, password }) {
    alert({ username, password });
  }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input name="username" type="text" className='form-control' />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" type="password" className='form-control' />
            </div>
            <button className="btn btn-primary">
              Login
            </button>
            <Link href="/account/register" className="btn btn-link">Register</Link>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login