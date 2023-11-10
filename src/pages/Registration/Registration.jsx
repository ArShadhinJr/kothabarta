import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth"
import { getDatabase, ref, set } from "firebase/database"
import { useId, useState } from 'react'
import { PiEyeClosedLight, PiEyeLight } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import logo from '../../assets/images/logo.png'
import registration from '../../assets/images/registration.png'

const Registration = () => {
  const navigate = useNavigate();
  const auth = getAuth(); 

  // firebase data write 
  const db = getDatabase();

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
                updateProfile(auth.currentUser, {
                    displayName: fullName, 
                  photoURL : "https://i.ibb.co/28yKTHD/1649500464.png" // demo image link for user 
                } )
                .then(()=>{
                  reset()
                  toast.success( "Check your email for verification" )
                  setTimeout(() => {
                    navigate("/")
                  }, 3000 )
                }).then( () => {
                  console.log( 'first' , fullName, password, email )
                  set( ref( db, 'users/' + auth.currentUser.uid ), {
                    username: fullName,
                    email: email,
                    photoURL : "https://i.ibb.co/28yKTHD/1649500464.png"
                  });
              })
              } )
              
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
        <div className="h-full xl:w-1/2 xl:flex items-center xl:pr-[69px] w-full grid">
        <div className="xl:w-[497px] w-4/5 mx-auto xl:mx-0 px-2 xl:ms-auto xl:text-start text-center ">
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
                  <div className='block xl:hidden mb-5'>
                    <img src={logo} />
                  </div>
                  <h1 className='xl:text-3xl text-2xl  text-tertiary font-nunito font-bold mb-3'>Get started with easily register</h1>
                  <p className="text-secondary text-xm">Sign up to get started with kothabarta</p>

                  <form action="#"  className="xl:mt-12 md:mt-10 sm:mt-8 mt-6 ">
                  <div className="relative z-10 xl:w-[368px] w-full xl:mt-12 md:mt-10 sm:mt-8 mt-6 group">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailErr}
                      className="block xl:px-[52px] md:px-[40px] sm:px-[30px] px-[22px] xl:py-[26px] md:py-[20px] sm:py-[16px] py-[10px] w-full xl:text-xl md:text-lg text-md text-primary bg-transparent border border-[#b8b9ce] focus:outline-none focus:ring-0 focus:border-primary rounded-lg appearance-none peer"
                      placeholder=" " 
                      required  
                      />

                    <label
                      htmlFor="email"
                      className=" peer-focus:xl:text-xl md:text-lg text-md absolute text-secondary duration-300 transform  -translate-y-10  scale-75 top-6 left-8 z-10 bg-white px-5 origin-[0] peer-focus:left-8  peer-placeholder-shown:-z-10 peer-placeholder-shown:left-8  peer-placeholder-shown:scale-100  xl:peer-placeholder-shown:translate-y-0
                      md:peer-placeholder-shown:-translate-y-1
                      sm:peer-placeholder-shown:-translate-y-2
                      peer-placeholder-shown:-translate-y-3 peer-focus:scale-75  peer-focus:z-10 peer-focus:bg-white  peer-focus:text-primary peer-focus:px-5  peer-focus:-translate-y-10"
                      >Email address</label>
                      
                      {
                      emailErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded xl:text-base md:text-sm text-xs">{emailErr}</p> : null 
                      }
                  </div>
                  <div className="relative z-10 xl:w-[368px] w-full xl:mt-12 md:mt-10 sm:mt-8 mt-6 group">
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={handleFullNameErr}
                      className="block xl:px-[52px] md:px-[40px] sm:px-[30px] px-[22px] xl:py-[26px] md:py-[20px] sm:py-[16px] py-[10px] w-full xl:text-xl md:text-lg text-md text-primary bg-transparent border border-[#b8b9ce] focus:outline-none focus:ring-0 focus:border-primary rounded-lg appearance-none peer"
                      placeholder=" "
                      required
                    />

                    <label
                      htmlFor="fullName"
                      className=" peer-focus:xl:text-xl md:text-lg text-md absolute  text-secondary duration-300 transform  -translate-y-10  scale-75 top-6 left-8 z-10 bg-white px-5 origin-[0] peer-focus:left-8  peer-placeholder-shown:-z-10 peer-placeholder-shown:left-8  peer-placeholder-shown:scale-100  xl:peer-placeholder-shown:translate-y-0
                      md:peer-placeholder-shown:-translate-y-1
                      sm:peer-placeholder-shown:-translate-y-2
                      peer-placeholder-shown:-translate-y-3 peer-focus:scale-75  peer-focus:z-10 peer-focus:bg-white  peer-focus:text-primary peer-focus:px-5  peer-focus:-translate-y-10"
                      >Full Name</label>
                      
                      {
                      fullNameErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded xl:text-base md:text-sm text-xs">{fullNameErr}</p> : null
                      }
                  </div>
                  <div className="input xl:w-[368px] w-full relative xl:mt-12 md:mt-10 sm:mt-8 mt-6">
                      <input value={password} onChange={handlePasswordErr} type={showPassword ? "text" : "password"} className="border border-[#b8b9ce] xl:w-[368px] w-full xl:px-[52px] md:px-[40px] sm:px-[30px] px-[22px] xl:py-[26px] md:py-[20px] sm:py-[16px] py-[10px] focus:outline-none rounded-lg text-primary xl:text-xl md:text-lg text-md" placeholder="**********" required/>
                      <span className="absolute top-0 left-12 -translate-y-3 bg-white px-[10px] text-[#9699ce] ">Password</span>
                      
                      
                      
                      <p className="absolute right-4 top-1/2 transform -translate-y-1/2 xl:text-xl md:text-lg text-md">
                        {
                        showPassword ? <i onClick={()=>setShowPassword(false)} ><PiEyeLight/></i> : <i onClick={()=>setShowPassword(true)}><PiEyeClosedLight/></i>
                        }
                      </p>
                      
                  </div>
                      {
                      passwordErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded xl:text-base md:text-sm text-xs xl:w-[368px] w-full">{passwordErr}</p> : null
                      }
                  <div className="xl:w-[368px] w-full  xl:mt-10  sm:mt-8 mt-6">
                      <button type="submit" onClick={handleSubmit} className="bg-primary text-white w-full xl:py-[20px] md:py-[17px] sm:py-[15px] py-[12px] rounded-full xl:text-xl md:text-lg text-md">Sign up</button>
                      <p className='text-center xl:mt-8 md:mt-6 sm:mt-6 mt-4 text-tertiary xl:text-base text-sm'>Already have an account? <Link to='/' className="text-orange-600 font-bold">Sign in</Link></p> 
                  </div>
                  </form>
            </div>
              
        </div>
        <div className="h-screen xl:w-1/2 xl:block hidden">
            <img src={registration} alt="kothabarta reg image" className="h-screen w-full object-cover"/>
        </div>
    </div>
  )
}

export default Registration