import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddUser = () => {
  let navigate = useNavigate()
  let [errorMessage, setErrorMessage] = useState('')
  let [isError, setIsError] = useState(false)
  let [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: ''
  })

  let changeInput = (e) => {
    let { name, value } = e.target
    setInput({
      ...input,
      [name]: value
    })
  }

  async function saveSubmit(e) {
    e.preventDefault()
    try {
      let link = import.meta.env.VITE_BASE_URL + `/add-user`
      await axios({
        method: 'post',
        url: link,
        data: input,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      Swal.fire({
        title: "Success!",
        text: "User successfully added",
        icon: "success"
      })
      navigate('/')
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      setErrorMessage(error.response.data.message)
      setIsError(true)
    }
  }

  return (
    <>
      <section className='m-10'>
        <div className="mockup-window rounded-2xl mb-5 bg-base-200">
          <h2 className="font-bold flex justify-center font-serif mb-7 text-2xl">Add User</h2>
        </div>
        {isError && (
          <div role="alert" className="alert mb-2 alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorMessage}</span>
          </div>
        )}
        <form className='' onSubmit={saveSubmit}>

          <div className="py-4" >
            <span htmlFor="username">Username</span>
            <input
              type="text"
              className="w-full p-2 mt-2 border rounded-md placeholder:text-inherit-300"
              placeholder='Username'
              name="username"
              id="username"
              onChange={changeInput}
            />
          </div>

          <div className="py-4" >
            <span htmlFor="username">Email</span>
            <input
              type="email"
              className="w-full p-2 mt-2 border rounded-md placeholder:text-inherit-300"
              placeholder='Email'
              name="email"
              id="email"
              onChange={changeInput}
            />
          </div>

          <div className="py-4" >
            <span htmlFor="username">Password</span>
            <input
              type="password"
              className="w-full p-2 mt-2 border rounded-md placeholder:text-inherit-300"
              placeholder='Password'
              name="password"
              id="password"
              onChange={changeInput}
            />
          </div>

          <div className="py-4" >
            <span htmlFor="username">Phone Number</span>
            <input
              type="phoneNumber"
              className="w-full border p-2 mt-2 rounded-md placeholder:text-inherit-300"
              placeholder='Phone Number'
              name="phoneNumber"
              id="phoneNumber"
              onChange={changeInput}
            />
          </div>

          <div className="py-4" >
            <span htmlFor="username">Address</span>
            <textarea
              type="address"
              className="w-full p-2 mt-2 rounded-md border placeholder:text-inherit-300"
              placeholder='Address'
              name="address"
              id="address"
              onChange={changeInput}
            >
            </textarea>
          </div>

          <button type="submit" className="btn bg-base-200">Submit</button>
          <a href='/' className="btn mx-4 bg-base-300">Cancel</a>
        </form>
      </section>

    </>
  )
}

export default AddUser