/* eslint-disable no-unused-vars */
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
import Homee from './Components/Homee/Homee'
import Notification from './Components/Notification/Notification'
import Setting from './Components/Setting/Setting'
import Messages from './Components/Messages/Messages.jsx'
import Chat from './Components/Chat/Chat.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/homee" element={<Homee />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
