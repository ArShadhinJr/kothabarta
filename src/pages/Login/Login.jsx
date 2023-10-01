import login from '../../assets/images/login.jpg'
import google from '../../assets/images/google.svg'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

const Login = () => {


  return (
    <div className="flex w-full h-screen">
        <div className="h-screen lg:w-1/2 w-4/5 mx-auto lg:flex items-center lg:pr-[69px] grid ">
        <div className="lg:w-[497px] lg:ms-auto lg:me-0 text-center">
          <div className='lg:hidden block fixed top-0 left-1/2 -translate-x-1/2 py-4'>
            <img src={logo} alt="" />
          </div>
                  <h1 className='text-3xl text-tertiary font-nunito font-bold mb-8'>Login to your account!</h1>
                  
                  <button className='flex items-center font-semibold latter-spacing-[.267px] border border-[#b8b9ce]  rounded-lg px-5 py-2 lg:text-base text-sm'><img src={google} className='mr-2'/>Login with Google</button>
                  
                  <div className="relative z-0 lg:w-[368px] w-full lg:mt-16 md:mt-10 sm:mt-8 mt-6 group">
                    <input
                      type="email"
                      id="email"
                      className="block py-[16px] lg:text-xl md:text-lg text-base w-full text-primary bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder=" "
                      required />
                    
                    <label
                      htmlFor="email"
                      className="peer-focus:lg:text-xl md:text-lg text-base absolute lg:text-xl md:text-lg text-base text-gray-500 duration-300 transform  -translate-y-10 scale-75 top-6 left-0 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                      peer-focus:z-10
                      peer-focus:bg-white 
                      peer-focus:text-primary 
                      peer-focus:-translate-y-10">Email address</label>
                  </div>
                  <div className="relative z-0 lg:w-[368px] w-full md:mt-10 sm:mt-8 mt-6 group">
                    <input
                      type="password"
                      id="password"
                      className="block py-[16px] lg:text-xl md:text-lg text-base w-full text-primary bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder=" "
                      required />
                    
                    <label
                      htmlFor="password"
                      className="peer-focus:text-xl absolute lg:text-xl md:text-lg text-base text-gray-500 duration-300 transform  -translate-y-10 scale-75 top-6 left-0 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                      peer-focus:z-10
                      peer-focus:bg-white 
                      peer-focus:text-primary 
                      peer-focus:-translate-y-10">Password</label>
                      
            
                  </div>
                  
                  
                  <div className="lg:w-[368px] w-full lg:mt-16 md:mt-10 sm:mt-8 mt-6">
                      <button className="bg-primary text-white w-full lg:py-[20px] md:py-[17px] sm:py-[15px] py-[12px] rounded-full lg:text-xl md:text-lg text-base  ">Login to Continue</button>
                      <p className='text-center lg:mt-9 md:mt-7 sm:mt-5 mt-4 text-tertiary lg:text-base text-sm'>Don’t have an account ? <Link to='/registration' className="text-orange-600 font-bold">Sign Up</Link></p>
                  </div>
            </div>
              
        </div>
        <div className="h-screen lg:w-1/2 lg:block hidden">
            <img src={login} alt="kothabarta reg image" className="h-screen w-full object-cover"/>
        </div>
    </div>
  )
}

export default Login