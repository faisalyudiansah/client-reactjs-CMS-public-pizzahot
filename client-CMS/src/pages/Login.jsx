import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import backgroundImage from '../assets/pizza-login.jpg'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let [input, setInput] = useState()
  let navigate = useNavigate()

  let changeInput = (e) => {
    let { name, value } = e.target
    setInput({
      ...input,
      [name]: value
    })
  }

  async function submitLogin(e) {
    e.preventDefault()
    try {
      let link = import.meta.env.VITE_BASE_URL + `/login`
      let { data } = await axios({
        method: 'post',
        url: link,
        data: input
      })
      localStorage.access_token = data.access_token
      navigate('/')
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
    }
  }

  return (
    <>
      <section>
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div
              className="absolute inset-0 bg-gradient-to-r from-black to-orange-700 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl ">
            </div>
            <div className="relative px-4 py-10 bg-gradient-to-l from-black to-orange-700 shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-4xl text-orange-700 font-serif text-center">Login</h1>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                    <form action="" onSubmit={submitLogin}>
                      <div className="relative">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input onChange={changeInput} name='email' type="email" placeholder="Email" className="input text-secondary-content bg-base-300 w-72 input-bordered" required />
                      </div>
                      <div className="relative mt-1">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>
                        <input onChange={changeInput} name='password' type="password" placeholder="Password" className="input text-secondary-content bg-base-300 w-72 input-bordered" required />
                      </div>
                      <div className="relative mt-10">
                        <button className="bg-base-300 rounded-lg text-sm w-20 text-center hover:bg-base-100 text-secondary-content font-light p-2">Submit</button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login