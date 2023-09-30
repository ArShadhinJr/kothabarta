import login from '../../assets/images/login.jpg'
import google from '../../assets/images/google.svg'

const Login = () => {


  return (
    <div className="flex w-full h-screen">
        <div className="h-screen w-1/2 flex items-center pr-[69px]">
          <div className="w-[497px] ms-auto">
                  <h1 className='text-3xl text-tertiary font-nunito font-bold mb-8'>Login to your account!</h1>
                  
                  <button className='flex font-semibold latter-spacing-[.267px] border border-[#b8b9ce]  rounded-lg px-5 py-2 '><img src={google} className='mr-2'/>Login with Google</button>
                  
                  <div className="relative z-0 w-[368px] mt-16 group">
                    <input
                      type="email"
                      id="email"
                      className="block py-[16px] text-xl w-full text-primary bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder=" "
                      required />
                    
                    <label
                      htmlFor="email"
                      className="peer-focus:text-xl absolute text-xl text-gray-500 duration-300 transform  -translate-y-10 scale-75 top-6 left-0 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                      peer-focus:z-10
                      peer-focus:bg-white 
                      peer-focus:text-primary 
                      peer-focus:-translate-y-10">Email address</label>
                  </div>
                  <div className="relative z-0 w-[368px] mt-10 group">
                    <input
                      type="password"
                      id="password"
                      className="block py-[16px] text-xl w-full text-primary bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                      placeholder=" "
                      required />
                    
                    <label
                      htmlFor="password"
                      className="peer-focus:text-xl absolute text-xl text-gray-500 duration-300 transform  -translate-y-10 scale-75 top-6 left-0 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                      peer-focus:z-10
                      peer-focus:bg-white 
                      peer-focus:text-primary 
                      peer-focus:-translate-y-10">Password</label>
                      
                      {/* password hide show icon  */}
            
                  </div>
                  
                  {/*  */}
                  
                  <div className="w-[368px] mt-16">
                      <button className="bg-primary text-white w-full py-[20px] rounded-full text-xl">Login to Continue</button>
                      <p className='text-center mt-9 text-tertiary'>Don’t have an account ? <a href='#' className="text-orange-600 font-bold">Sign Up</a></p>
                  </div>
            </div>
              
        </div>
        <div className="h-screen w-1/2">
            <img src={login} alt="kothabarta reg image" className="h-screen w-full object-cover"/>
        </div>
    </div>
  )
}

export default Login