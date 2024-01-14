import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import Swal from 'sweetalert2'
import Login from './pages/Login'
import Layout from './Layout'
import DashboardCuisines from './pages/DashboardCuisines'
import DashboardCategory from './pages/DashboardCategory'
import AddUser from './pages/AddUser'

let authHome = () => {
  let access_token = localStorage.access_token
  if (!access_token) {
    throw redirect('/login')
  }
  return null
}

let authLogin = () => {
  let access_token = localStorage.access_token
  if (access_token) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are already logged in.",
    })
    throw redirect('/')
  }
  return null
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: authLogin
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DashboardCuisines />,
        loader: authHome,
      },
      {
        path: "/list-category",
        element: <DashboardCategory />,
        loader: authHome,
      },
      {
        path: "/add-user",
        element: <AddUser />,
        loader: authHome,
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
