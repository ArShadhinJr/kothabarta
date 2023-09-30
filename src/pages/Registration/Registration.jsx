import registration from '../../assets/images/registration.png'

const Registration = () => {


  return (
    <div className="flex w-full h-screen">
        <div className="h-screen w-1/2 flex items-center pr-[69px]">
          <div className="w-[497px] ms-auto">
                  <h1 className='text-3xl text-tertiary font-nunito font-bold mb-3'>Get started with easily register</h1>
                  <p className="text-secondary text-xl">Sign up to get started with kothabarta</p>
                  
                  

                  <div className="relative z-10 w-[368px] mt-12 group">
                    <input
                      type="email"
                      id="email"
                      className="block px-[52px] py-[26px] w-full text-xl text-primary bg-transparent border border-[#b8b9ce] focus:outline-none focus:ring-0 focus:border-primary rounded-lg appearance-none peer"
                      placeholder=" "
                      required/>

                    <label
                      htmlFor="email"
                      className=" peer-focus:text-xl absolute text-xl text-secondary duration-300 transform  -translate-y-10  scale-75 top-6 left-8 z-10 bg-white px-5 origin-[0] peer-focus:left-8  peer-placeholder-shown:-z-10 peer-placeholder-shown:left-8  peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:z-10 peer-focus:bg-white  peer-focus:text-primary peer-focus:px-5  peer-focus:-translate-y-10"
                      >Email address</label>
                  </div>
                  <div className="relative z-10 w-[368px] mt-8 group">
                    <input
                      type="text"
                      id="fullName"
                      className="block px-[52px] py-[26px] w-full text-xl text-primary bg-transparent border border-[#b8b9ce] focus:outline-none focus:ring-0 focus:border-primary rounded-lg appearance-none peer"
                      placeholder=" "
                      required
                    />

                    <label
                      htmlFor="fullName"
                      className=" peer-focus:text-xl absolute text-xl text-secondary duration-300 transform  -translate-y-10  scale-75 top-6 left-8 z-10 bg-white px-5 origin-[0] peer-focus:left-8  peer-placeholder-shown:-z-10 peer-placeholder-shown:left-8  peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0 peer-focus:scale-75  peer-focus:z-10 peer-focus:bg-white  peer-focus:text-primary peer-focus:px-5  peer-focus:-translate-y-10"
                      >Full Name</label>
                  </div>
                  <div className="input relative mt-14">
                      <input type="password" className="border border-[#b8b9ce] w-[368px] px-[52px] py-[26px] focus:outline-none rounded-lg text-primary text-xl" placeholder="**********"/>
                      <span className="absolute top-0 left-12 -translate-y-3 bg-white px-[10px] text-[#9699ce] ">Password</span>
                  </div>
                  <div className="w-[368px] mt-16">
                      <button className="bg-primary text-white w-full py-[20px] rounded-full text-xl">Sign up</button>
                      <p className='text-center mt-9 text-tertiary'>Already have an account? <a href='#' className="text-orange-600 font-bold">Sign in</a></p>
                  </div>
            </div>
              
        </div>
        <div className="h-screen w-1/2">
            <img src={registration} alt="kothabarta reg image" className="h-screen w-full object-cover"/>
        </div>
    </div>
  )
}

export default Registration