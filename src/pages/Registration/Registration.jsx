import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth"
import { useState } from 'react'
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import logo from '../../assets/images/logo.png'
import registration from '../../assets/images/registration.png'

const Registration = () => {
  const navigate = useNavigate();
  const auth = getAuth(); 

  const [ email, setEmail ] = useState( '' )
  const [ fullName, setFullName ] = useState( '' )
  const [ password, setPassword ] = useState( '' )

  const [ showPassword , setShowPassword ] = useState( false )

  const [ emailErr, setEmailErr ] = useState( "" )
  const [ fullNameErr, setFullNameErr ] = useState( "" )
  const [ passwordErr, setPasswordErr ] = useState( "" )

  const handleEmailErr = ( e ) => {
    if( e.target.value === "" ) {
      setEmailErr( "Email is required" )
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( e.target.value ) ) {
      setEmailErr( "Email is invalid" )
      setEmail( e.target.value )
    } else {
      setEmailErr( " " )
      setEmail( e.target.value )
    }
  }

  const handleFullNameErr = ( e ) => {
    if( e.target.value === " " ) {
      setFullNameErr( "Full name is required" )
    } else {
      setFullNameErr( "" )
      setFullName( e.target.value )
    }
  }


  const handlePasswordErr = ( e ) => {
    if( e.target.value === " " ) {
      setPasswordErr( "Password is required" )
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
      setEmailErr ("Email is required")
    }

    if ( !fullName ) {
      setFullNameErr( "Full name is required" )
    } 
    if ( !password ) {
      setPasswordErr( "Password is required" )
    }
    
    let reset = () => {
      setEmail( "" )
      setFullName( "" )
      setPassword( "" )
    }

    

    if (  fullName &&  (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( email )) && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/.test( password ))  ) {
          createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              sendEmailVerification( auth.currentUser )
              .then ( () => {
                reset()
                toast.success( "Check your email for verification" )
                setTimeout(() => {
                  navigate("/")
                }, 3000)
              })
            })
            .catch((error) => {
              const errorCode = error.code;
              console.log( errorCode )
              if ( errorCode === "auth/email-already-in-use" ) {
                setEmailErr( "Email already in use" )
              }
            });
    }
  }

  return (
    <div className="flex w-full h-screen">
        <div className="h-full lg:w-1/2 lg:flex items-center lg:pr-[69px] w-full grid">
        <div className="lg:w-[497px] w-4/5 mx-auto lg:mx-0 px-2 lg:ms-auto lg:text-start text-center ">
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
                  <div className='block lg:hidden mb-5'>
                    <img src={logo} />
                  </div>
                  <h1 className='lg:text-3xl text-2xl  text-tertiary font-nunito font-bold mb-3'>Get started with easily register</h1>
                  <p className="text-secondary text-xm">Sign up to get started with kothabarta</p>

                  <form action="#"  className="lg:mt-12 md:mt-10 sm:mt-8 mt-6 ">
                  <div className="relative z-10 lg:w-[368px] w-full lg:mt-12 md:mt-10 sm:mt-8 mt-6 group">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailErr}
                      className="block lg:px-[52px] md:px-[40px] sm:px-[30px] px-[22px] lg:py-[26px] md:py-[20px] sm:py-[16px] py-[10px] w-full lg:text-xl md:text-lg text-md text-primary bg-transparent border border-[#b8b9ce] focus:outline-none focus:ring-0 focus:border-primary rounded-lg appearance-none peer"
                      placeholder=" " 
                      required  
                      />

                    <label
                      htmlFor="email"
                      className=" peer-focus:lg:text-xl md:text-lg text-md absolute text-secondary duration-300 transform  -translate-y-10  scale-75 top-6 left-8 z-10 bg-white px-5 origin-[0] peer-focus:left-8  peer-placeholder-shown:-z-10 peer-placeholder-shown:left-8  peer-placeholder-shown:scale-100  lg:peer-placeholder-shown:translate-y-0
                      md:peer-placeholder-shown:-translate-y-1
                      sm:peer-placeholder-shown:-translate-y-2
                      peer-placeholder-shown:-translate-y-3 peer-focus:scale-75  peer-focus:z-10 peer-focus:bg-white  peer-focus:text-primary peer-focus:px-5  peer-focus:-translate-y-10"
                      >Email address</label>
                      
                      {
                      emailErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded lg:text-base md:text-sm text-xs">{emailErr}</p> : null 
                      }
                  </div>
                  <div className="relative z-10 lg:w-[368px] w-full lg:mt-12 md:mt-10 sm:mt-8 mt-6 group">
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={handleFullNameErr}
                      className="block lg:px-[52px] md:px-[40px] sm:px-[30px] px-[22px] lg:py-[26px] md:py-[20px] sm:py-[16px] py-[10px] w-full lg:text-xl md:text-lg text-md text-primary bg-transparent border border-[#b8b9ce] focus:outline-none focus:ring-0 focus:border-primary rounded-lg appearance-none peer"
                      placeholder=" "
                      required
                    />

                    <label
                      htmlFor="fullName"
                      className=" peer-focus:lg:text-xl md:text-lg text-md absolute  text-secondary duration-300 transform  -translate-y-10  scale-75 top-6 left-8 z-10 bg-white px-5 origin-[0] peer-focus:left-8  peer-placeholder-shown:-z-10 peer-placeholder-shown:left-8  peer-placeholder-shown:scale-100  lg:peer-placeholder-shown:translate-y-0
                      md:peer-placeholder-shown:-translate-y-1
                      sm:peer-placeholder-shown:-translate-y-2
                      peer-placeholder-shown:-translate-y-3 peer-focus:scale-75  peer-focus:z-10 peer-focus:bg-white  peer-focus:text-primary peer-focus:px-5  peer-focus:-translate-y-10"
                      >Full Name</label>
                      
                      {
                      fullNameErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded lg:text-base md:text-sm text-xs">{fullNameErr}</p> : null
                      }
                  </div>
                  <div className="input lg:w-[368px] w-full relative lg:mt-12 md:mt-10 sm:mt-8 mt-6">
                      <input value={password} onChange={handlePasswordErr} type={showPassword ? "text" : "password"} className="border border-[#b8b9ce] lg:w-[368px] w-full lg:px-[52px] md:px-[40px] sm:px-[30px] px-[22px] lg:py-[26px] md:py-[20px] sm:py-[16px] py-[10px] focus:outline-none rounded-lg text-primary lg:text-xl md:text-lg text-md" placeholder="**********" required/>
                      <span className="absolute top-0 left-12 -translate-y-3 bg-white px-[10px] text-[#9699ce] ">Password</span>
                      
                      
                      
                      <p className="absolute right-4 top-1/2 transform -translate-y-1/2 lg:text-xl md:text-lg text-md">
                        {
                        showPassword ? <i onClick={()=>setShowPassword(false)} ><PiEyeLight/></i> : <i onClick={()=>setShowPassword(true)}><PiEyeClosedLight/></i>
                        }
                      </p>
                      
                  </div>
                      {
                      passwordErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded lg:text-base md:text-sm text-xs lg:w-[368px] w-full">{passwordErr}</p> : null
                      }
                  <div className="lg:w-[368px] w-full  lg:mt-10  sm:mt-8 mt-6">
                      <button type="submit" onClick={handleSubmit} className="bg-primary text-white w-full lg:py-[20px] md:py-[17px] sm:py-[15px] py-[12px] rounded-full lg:text-xl md:text-lg text-md">Sign up</button>
                      <p className='text-center lg:mt-8 md:mt-6 sm:mt-6 mt-4 text-tertiary lg:text-base text-sm'>Already have an account? <Link to='/' className="text-orange-600 font-bold">Sign in</Link></p> 
                  </div>
                  </form>
            </div>
              
        </div>
        <div className="h-screen lg:w-1/2 lg:block hidden">
            <img src={registration} alt="kothabarta reg image" className="h-screen w-full object-cover"/>
        </div>
    </div>
  )
}

export default Registration