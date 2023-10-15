import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Registration from './pages/Registration/Registration.jsx'
import firebaseConfig from './authentication/firebaseConfig'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import { Provider } from 'react-redux'
import { store } from './Redux/store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
