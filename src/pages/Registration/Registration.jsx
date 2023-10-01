import { useState } from 'react'
import registration from '../../assets/images/registration.png'
import { PiEyeLight , PiEyeClosedLight} from 'react-icons/pi'

const Registration = () => {

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
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test( e.target.value ) ) {
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
      setEmailErr( "Email is required" )
    } 
    if ( !fullName ) {
      setFullNameErr( "Full name is required" )
    } 
    if ( !password ) {
      setPasswordErr( "Password is required" )
    }

    if ( email && fullName && password ) {
      setEmail( "" )
      setFullName( "" )
      setPassword( "" )
      alert( "Registration successful" )
    }
  }


  return (
    <div className="flex w-full h-screen">
        <div className="h-screen w-1/2 flex items-center pr-[69px]">
          <div className="w-[497px] ms-auto">
                  <h1 className='text-3xl text-tertiary font-nunito font-bold mb-3'>Get started with easily register</h1>
                  <p className="text-secondary text-xl">Sign up to get started with kothabarta</p>

                  <form action="#"  className="mt-12">
                    <div className="relative z-10 w-[368px] mt-12 group">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailErr}
                      className="block px-[52px] py-[26px] w-full text-xl text-primary bg-transparent border border-[#b8b9ce] focus:outline-none focus:ring-0 focus:border-primary rounded-lg appearance-none peer"
                      placeholder=" " 
                      required  
                      />
                      
                      

                    <label
                      htmlFor="email"
                      className=" peer-focus:text-xl absolute text-xl text-secondary duration-300 transform  -translate-y-10  scale-75 top-6 left-8 z-10 bg-white px-5 origin-[0] peer-focus:left-8  peer-placeholder-shown:-z-10 peer-placeholder-shown:left-8  peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:z-10 peer-focus:bg-white  peer-focus:text-primary peer-focus:px-5  peer-focus:-translate-y-10"
                      >Email address</label>
                      
                      {
                      emailErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded">{emailErr}</p> : null 
                      }
                  </div>
                  <div className="relative z-10 w-[368px] mt-8 group">
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={handleFullNameErr}
                      className="block px-[52px] py-[26px] w-full text-xl text-primary bg-transparent border border-[#b8b9ce] focus:outline-none focus:ring-0 focus:border-primary rounded-lg appearance-none peer"
                      placeholder=" "
                      required
                    />

                    <label
                      htmlFor="fullName"
                      className=" peer-focus:text-xl absolute text-xl text-secondary duration-300 transform  -translate-y-10  scale-75 top-6 left-8 z-10 bg-white px-5 origin-[0] peer-focus:left-8  peer-placeholder-shown:-z-10 peer-placeholder-shown:left-8  peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:z-10 peer-focus:bg-white  peer-focus:text-primary peer-focus:px-5  peer-focus:-translate-y-10"
                      >Full Name</label>
                      
                      {
                      fullNameErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded">{fullNameErr}</p> : null
                      }
                  </div>
                  <div className="input w-[368px] relative mt-14">
                      <input value={password} onChange={handlePasswordErr} type={showPassword ? "text" : "password"} className="border border-[#b8b9ce] w-[368px] px-[52px] py-[26px] focus:outline-none rounded-lg text-primary text-xl" placeholder="**********" required/>
                      <span className="absolute top-0 left-12 -translate-y-3 bg-white px-[10px] text-[#9699ce] ">Password</span>
                      
                      
                      
                      <p className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">
                        {
                        showPassword ? <i onClick={()=>setShowPassword(false)} ><PiEyeLight/></i> : <i onClick={()=>setShowPassword(true)}><PiEyeClosedLight/></i>
                        }
                      </p>
                      
                  </div>
                      {
                      passwordErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded w-[368px]">{passwordErr}</p> : null
                      }
                  <div className="w-[368px] mt-16">
                      <button type="submit" onClick={handleSubmit} className="bg-primary text-white w-full py-[20px] rounded-full text-xl">Sign up</button>
                      <p className='text-center mt-9 text-tertiary'>Already have an account? <a href='#' className="text-orange-600 font-bold">Sign in</a></p>
                  </div>
                  </form>
            </div>
              
        </div>
        <div className="h-screen w-1/2">
            <img src={registration} alt="kothabarta reg image" className="h-screen w-full object-cover"/>
        </div>
    </div>
  )
}

export default Registration