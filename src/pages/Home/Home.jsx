import { useNavigate } from "react-router-dom";
import DivCenter from "../../Components/DivCenter/DivCenter"
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../Slices/counterSlice";


const Home = () => {

  const count = useSelector( state => state.counter.value )
  const user = useSelector( ( state ) => state.user.userInfo )
  const email = user.email
  const dispatch = useDispatch()

  const auth = getAuth();
  const navigate = useNavigate()

  const logOut = () => {

    signOut( auth ).then( () => {
      localStorage.removeItem('user')
      setTimeout(() => {
        navigate ('/')
      }, 1000 )
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

        <h2 className="text-center text-6xl mt-5">Count: {count}</h2>
        <div className="flex justify-center gap-x-4 ">
          <button onClick={()=>{dispatch(decrement())}} className="mt-6 bg-slate-200 text-primary px-5 py-0 rounded-lg w-full text-3xl">-</button>
          <button onClick={()=>{dispatch(increment())}} className="mt-6 bg-slate-200 text-primary px-5 py-0 rounded-lg w-full text-3xl">+</button>
        </div>
        <p className="mt-5 text-center">{email}</p>
        <button onClick={logOut} className="mt-6 bg-slate-200 text-primary px-5 py-2 rounded-lg w-full">Log Out</button>
      </DivCenter>
    </>
  )
}

export default Home