import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link';

const Register = () => {

  const handleSubmit = () => {
    console.log('Register');
  }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input name="firstName" type="text" className='form-control' />
            </div>
            <div className="mb-3">
              <label className="form-label">Email ID</label>
              <input name="emailid" type="text" className='form-control' />
            </div>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input name="userName" type="text" className='form-control' />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" type="password" className='form-control' />
            </div>
            <button className="btn btn-primary">
              Register
            </button>
            <Link href="/account/login" className="btn btn-link">Cancel</Link>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register