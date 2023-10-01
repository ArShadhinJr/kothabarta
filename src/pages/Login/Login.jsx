import login from '../../assets/images/login.jpg'
import google from '../../assets/images/google.svg'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { useState } from 'react'
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi'

const Login = () => {
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
    } else if (/^(?=.*[A-Z]).*$/.test( e.target.value ) === false) {
      setPasswordErr( "Password must contain at least one uppercase" )
      setPassword( e.target.value )
    } else if (/^(?=.*[a-z]).*$/.test( e.target.value ) === false) {
      setPasswordErr( "Password must contain at least one lowercase" )
      setPassword( e.target.value )
    } else if (/^(?=.*[0-9]).*$/.test(e.target.value) === false) {
      setPasswordErr( "Password must contain at least one number" )
      setPassword( e.target.value )
    } else if ( /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_]).*$/.test( e.target.value ) === false ) {
      setPasswordErr( "Password must contain at least one special character" )
      setPassword( e.target.value )
    } else if ( /^.{8,14}$/.test( e.target.value ) === false ) {
      setPasswordErr( "Password must be between 8 and 14 characters" )
      setPassword( e.target.value )
    } else if ( ( /^(?!.* ).*$/.test( e.target.value ) === false ) ) {
      setPasswordErr( "Password must not contain spaces" )
      setPassword( e.target.value )
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

  }

  return (
    <div className="flex w-full h-screen">
        <div className="h-screen lg:w-1/2 w-4/5 mx-auto lg:flex items-center pl lg:pr-[69px] grid ">
        <div className="lg:w-[497px] lg:ms-auto lg:me-0 text-center">
          <div className='lg:hidden block fixed top-0 left-1/2 -translate-x-1/2 py-4'>
            <img src={logo} alt="" />
          </div>
                  <h1 className='text-3xl text-tertiary font-nunito font-bold mb-8'>Login to your account!</h1>
                  
                  <button className='flex items-center font-semibold latter-spacing-[.267px] border border-[#b8b9ce]  rounded-lg px-5 py-2 lg:text-base text-sm'><img src={google} className='mr-2'/>Login with Google</button>
                  
                  <form action="">
                    <div className="relative z-0 lg:w-[368px] w-full lg:mt-16 md:mt-10 sm:mt-8 mt-6 group">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmail}
                      className="block py-[16px] lg:text-xl md:text-lg text-base w-full text-primary bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder=" "
                      required />
                    
                    <label
                      htmlFor="email"
                      className="peer-focus:text-xl  absolute lg:text-xl md:text-lg text-base text-gray-500 duration-300 transform  -translate-y-10 scale-75 top-6 left-0 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                      peer-focus:z-10
                      peer-focus:bg-white 
                      peer-focus:text-primary 
                      peer-focus:-translate-y-10">Email address</label>
                      
                      {
                      emailErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded lg:text-base md:text-sm text-xs">{emailErr}</p> : null 
                      }
                  </div>
                  <div className="relative z-0 lg:w-[368px] w-full md:mt-10 sm:mt-8 mt-6 group">
                    <input
                      type={!showPassword ? "password" : "text"}
                      id="password"
                      value={password}
                      className="block py-[16px] lg:text-xl md:text-lg text-base w-full text-primary bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder=" "
                      required 
                      onChange={handlePassword}/>
                    
                    <label
                      htmlFor="password"
                      className="peer-focus:text-xl absolute lg:text-xl md:text-lg text-base text-gray-500 duration-300 transform  -translate-y-10 scale-75 top-6 left-0 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                      peer-focus:z-10
                      peer-focus:bg-white 
                      peer-focus:text-primary 
                      peer-focus:-translate-y-10">Password</label>
                      
                      <p onClick={()=>{setShowPassword(!showPassword)}} className='absolute top-1/2 right-4 -translate-y-1/2'>
                        {showPassword ? <PiEyeLight/> : <PiEyeClosedLight/>}
                      </p>
                      
            
                  </div>
                  
                  <div className='lg:w-[368px] w-full'>
                      {
                      passwordErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded lg:text-base md:text-sm text-xs">{passwordErr}</p> : null 
                      }
                    
                  </div>
                  <div className="lg:w-[368px] w-full lg:mt-10 md:mt-10 sm:mt-8 mt-6">
                      <button onClick={handleSubmit} className="bg-primary text-white w-full lg:py-[20px] md:py-[17px] sm:py-[15px] py-[12px] rounded-full lg:text-xl md:text-lg text-base" >Login to Continue</button>
                      <p className='text-center lg:mt-9 md:mt-7 sm:mt-5 mt-4 text-tertiary lg:text-base text-sm'>Don’t have an account ? <Link to='/registration' className="text-orange-600 font-bold">Sign Up</Link></p>
                  </div>
                  </form>
            </div>
              
        </div>
        <div className="h-screen lg:w-1/2 lg:block hidden">
            <img src={login} alt="kothabarta reg image" className="h-screen w-full object-cover"/>
        </div>
    </div>
  )
}

export default Login