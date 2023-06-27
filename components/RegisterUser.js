import React, { useState } from 'react'
import Layout from './Layout'
import Link from 'next/link'

const userInitialState = {
  fullname: "",
  username: "",
  password: "",
  email: "",
}

const RegisterUser = () => {
  const [user, setUser] = useState(userInitialState)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json()
    if (response.status === 200) {
      alert(data.response.message)
    }
    setUser(userInitialState)
  }

  const handleChange = (event) => {
    setUser(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <Layout>
      <div className="card col-md-4 offset-md-4">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input name="fullname" type="text" className='form-control' value={user.fullname} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email ID</label>
              <input name="email" type="text" className='form-control' value={user.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input name="username" type="text" className='form-control' value={user.username} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" type="password" className='form-control' value={user.password} onChange={handleChange} />
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

export default RegisterUser