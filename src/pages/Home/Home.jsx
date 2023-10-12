import { useNavigate } from "react-router-dom";
import DivCenter from "../../Components/DivCenter/DivCenter"
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify'


const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate()

  const logOut = () => {
    signOut(auth).then(() => {
      setTimeout(() => {
        navigate ('/')
      }, 3000 )
      toast.success( "Logout successfully" );
    }).catch((error) => {
      console.log(error)
    });
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
      <DivCenter className="h-96 w-96 bg-slate-700 text-white rounded-lg p-6">
        <h1 className="text-center text-4xl font-nunito font-black mt-6">Welcome</h1>
        <button onClick={logOut} className="mt-6 bg-slate-200 text-primary px-5 py-2 rounded-lg w-full">Log Out</button>
      </DivCenter>
    </>
  )
}

export default Home