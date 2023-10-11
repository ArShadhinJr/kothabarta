import { useState } from "react"
import DivCenter from "../DivCenter/DivCenter"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const auth = getAuth();
    const [ email, setEmail ] = useState( "" )
    const [ emailErr, setEmailErr ] = useState( "" )
    const navigate = useNavigate()

    const handleEmail = ( e ) => {
        if ( email  === " " ) {
            setEmailErr( "Email is required" )
        } else {
            setEmailErr( "" )
            setEmail( e.target.value )
        }
    }
    
    const handleSend = ( e ) => {
        e.preventDefault()
        if( email ) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setEmail( "" )
                    setEmailErr( "" )
                    toast.success( "Check your email" );
                    setTimeout(() => {
                        navigate ( "/")
                    }, 3000)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if(errorCode === "auth/invalid-login-credentials"){
                        setEmailErr( "Check your email" )
                    }
                });
        }
    }

  return (
    <>
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
    <DivCenter className="w-[700px] bg-primary text-white rounded-lg px-4 py-10">
        <p className="text-xl">Send password reset link</p>
        <form onSubmit={handleSend}>
            <input value={email} onChange={handleEmail} type="email" className="mt-6 px-4 py-2 w-full border border-[#b8b9ce] text-gray-900 text-xl focus:outline-none focus:ring-0 rounded-lg appearance-none" placeholder="Enter your email" />
            
            {
            emailErr ? <p className="text-white bg-red-500 px-3 mt-1 rounded lg:text-base md:text-sm text-xs">{emailErr}</p> : null
            }
            <button type="submit" className="mt-4 px-10 py-2 bg-white hover:bg-gray-200 text-primary text-xl">Send</button>
        </form>
    </DivCenter>
    </>
  )
}

export default ForgotPassword