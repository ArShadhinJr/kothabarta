import login from '../../assets/images/login.jpg'
import google from '../../assets/images/google.svg'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { useState } from 'react'
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi'
import { getAuth, signInWithEmailAndPassword , GoogleAuthProvider, signInWithPopup , FacebookAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify'
import {BsFacebook} from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Slices/userSlice'
import { getDatabase, ref, set } from "firebase/database";

const Login = () => {

  const dispatch = useDispatch();
  const db = getDatabase();

  const navigate = useNavigate();
  const auth = getAuth();
  const providerGoogle = new GoogleAuthProvider();
  const providerFacebook = new FacebookAuthProvider();

  const [ showPassword, setShowPassword ] = useState( false )
  
  const [ email, setEmail ] = useState( "" )
  const [ password, setPassword ] = useState( "" )
  
  const [ emailErr, setEmailErr ] = useState( "" )
  const [ passwordErr, setPasswordErr ] = useState( "" )
  
  const handleEmail = ( e ) => {
    if ( e.target.value === " " ) {
      setEmailErr( "Email is requierd" )
      setEmail (e.target.value)
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test( e.target.value ) ) {
      setEmailErr( "Email is invalid" ) 
      setEmail(e.target.value)
    } else {
      setEmailErr( "" )
      setEmail(e.target.value)
    }
  }

  const handlePassword = ( e ) => {
    if ( e.target.value === " " ) {
      setPasswordErr( "Password is requierd" )
    } else {
      setPasswordErr( "" )
      setPassword( e.target.value )
    }
  }

  const handleSubmit = ( e ) => {
    e.preventDefault() 

    if ( !email ) {
      setEmailErr("Email is requierd")
    }
    if ( !password ) {
      setPasswordErr("Password is requierd")
    }

    signInWithEmailAndPassword(auth, email, password)
      .then( (user) => {
      console.log(user.user)
      if (user.user.emailVerified === true) {
        toast.success( "Login successfully" );
        setTimeout(() => {
          navigate ( "/homee")
        }, 2000 )
        dispatch( setUser( user.user ) )
        localStorage.setItem( 'user', JSON.stringify( user.user ) )
      } else {
        toast.error( "Please verify your email" );
      }
      
    })
    .catch((error) => {
      const errorCode = error.code;
      if(errorCode === "auth/invalid-login-credentials"){
        setEmailErr( "Check your email and password" )
        setPasswordErr( "Check your email and password" )
      }
      
  });
 
  }

  const handleGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then( (user) => {
      setTimeout(() => {
      navigate ( "/homee")
      }, 3000 )
        set( ref( db, 'users/' + user.user.uid ), {
          username: user.user.displayName, 
          email: user.user.email, 
          photoURL: user.user.photoURL
        })
    dispatch( setUser( user.user ) )
    localStorage.setItem( 'user', JSON.stringify( user.user ) )
    toast.success( "Login successfully" );
  }).catch((error) => {
    const errorCode = error.code;
    console.log(errorCode)
  });
  }

  const handleFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then( () => {
    setTimeout(() => {
      navigate ( "/homee")
    }, 3000 )
    toast.success( "Login successfully" );
  })
  .catch((error) => {
    
    const errorCode = error.code;
    console.log(errorCode)
    
  });
  }

  return (
    <div className="flex w-full h-screen">
        <div className="h-screen xl:w-1/2 w-4/5 mx-auto xl:flex items-center pl xl:pr-[69px] grid ">
        <div className="xl:w-[497px] xl:ms-auto xl:me-0 text-center">
          <div className='xl:hidden block fixed top-0 left-1/2 -translate-x-1/2 py-4'>
            <img src={logo}/>
          </div>
                  <h1 className='text-3xl text-tertiary font-nunito font-bold mb-8'>Login to your account!</h1>
                  
          <div className="flex gap-2 sm:flex-row flex-col">
            <button onClick={handleGoogle} className='flex sm:w-1/2 w-full items-center font-semibold latter-spacing-[.267px] border border-[#b8b9ce] hover:bg-green-100 hover:border-green-500 hover:text-green-500 rounded-lg px-5 py-2 xl:text-base text-sm'><img src={google} className='mr-2' />Login with Google</button>
            <button onClick={handleFacebook} className='flex sm:w-1/2 w-full items-center font-semibold latter-spacing-[.267px] border border-[#b8b9ce] hover:bg-sky-100 hover:border-sky-500 hover:text-sky-500 rounded-lg px-5 py-2 xl:text-base text-sm'><BsFacebook className='mr-3 text-blue-500 scale-150'/>Login with Facebook</button>
          </div>
          <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover
          theme="light"
          />
                  
                  <form action="">
                    <div className="relative z-0 xl:w-[368px] w-full xl:mt-16 md:mt-10 sm:mt-8 mt-6 group">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmail}
                      className="block py-[16px] xl:text-xl md:text-lg text-base w-full text-primary bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder=" "
                      required />
                    
                    <label
                      htmlFor="email"
                      className="peer-focus:text-xl  absolute xl:text-xl md:text-lg text-base text-gray-500 duration-300 transform  -translate-y-10 scale-75 top-6 left-0 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                      peer-focus:z-10
                      peer-focus:bg-white 
                      peer-focus:text-primary 
                      peer-focus:-translate-y-10">Email address</label>
                      
                      {
                      emailErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded xl:text-base md:text-sm text-xs">{emailErr}</p> : null 
                      }
                  </div>
                  <div className="relative z-0 xl:w-[368px] w-full md:mt-10 sm:mt-8 mt-6 group">
                    <input
                      type={!showPassword ? "password" : "text"}
                      id="password"
                      value={password}
                      className="block py-[16px] xl:text-xl md:text-lg text-base w-full text-primary bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder=" "
                      required 
                      onChange={handlePassword}/>
                    
                    <label
                      htmlFor="password"
                      className="peer-focus:text-xl absolute xl:text-xl md:text-lg text-base text-gray-500 duration-300 transform  -translate-y-10 scale-75 top-6 left-0 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                      peer-focus:z-10
                      peer-focus:bg-white 
                      peer-focus:text-primary 
                      peer-focus:-translate-y-10">Password</label>
                      
                      <p onClick={()=>{setShowPassword(!showPassword)}} className='absolute top-1/2 right-4 -translate-y-1/2'>
                        {showPassword ? <PiEyeLight/> : <PiEyeClosedLight/>}
                      </p>
                      
            
                  </div>
                  
                  <div className='xl:w-[368px] w-full'>
                      <p className='text-start mt-3'><Link to='/forgotPassword' className="text-orange-600 font-bold">Forgot Password</Link></p>
                      {
                      passwordErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded xl:text-base md:text-sm text-xs">{passwordErr}</p> : null 
                      }
                    
                  </div>
                  <div className="xl:w-[368px] w-full xl:mt-10 md:mt-10 sm:mt-8 mt-6">
                      <button onClick={handleSubmit} className="bg-primary text-white w-full xl:py-[20px] md:py-[17px] sm:py-[15px] py-[12px] rounded-full xl:text-xl md:text-lg text-base" >Login to Continue</button>
                      <p className='text-center xl:mt-9 md:mt-7 sm:mt-5 mt-4 text-tertiary xl:text-base text-sm'>Don’t have an account ? <Link to='/registration' className="text-orange-600 font-bold">Sign Up</Link></p>
                  </div>
                  </form>
            </div>
              
        </div>
        <div className="h-screen xl:w-1/2 xl:block hidden">
            <img src={login} alt="kothabarta reg image" className="h-screen w-full object-cover"/>
        </div>
    </div>
  )
}

export default Login