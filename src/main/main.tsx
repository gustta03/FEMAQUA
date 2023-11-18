import React from 'react'
import ReactDOM from 'react-dom/client'
import '../app/styles/index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/app-router'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
     <Toaster />
  </React.StrictMode>,
)
