import React from 'react'


import Layout from './Layout'
import CustomLink from './CustomLink';

const LoginUser = () => {
  
  function handleSubmit({ username, password }) {
    alert({ username, password });
  }
  
  return (
    <Layout>
      <div className="card col-md-4 offset-md-4">
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
            <CustomLink href="/account/register" className="btn btn-link">Register</CustomLink>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default LoginUser