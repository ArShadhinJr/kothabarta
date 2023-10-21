import profile from '../../assets/images/profile.jpg'
import { AiOutlineHome } from 'react-icons/ai'
import { AiFillHome } from 'react-icons/ai'
import { FaRegCommentDots } from 'react-icons/fa'
import { FaCommentDots } from 'react-icons/fa'
import { AiOutlineBell } from 'react-icons/ai'
import { AiFillBell } from 'react-icons/ai'
import { AiOutlineSetting } from 'react-icons/ai'
import { AiFillSetting } from 'react-icons/ai'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoMdCloudUpload } from 'react-icons/io'
import MenuItem from '../MenuItem/MenuItem'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { setUser } from '../../Slices/userSlice'

const Menu = () => {

    const user = useSelector( ( state ) => state.user.userInfo )
    const auth = getAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [ hover, setHover ] = useState( {
        home: false,
        comment: false,
        bell: false,
        setting: false,
    } )

    const [active , setActive ] = useState( {
        home: true,
        comment: false,
        bell: false,
        setting: false,
    })

    const logOut = () => {
        signOut( auth ).then( () => {
            setTimeout(() => {
                navigate ('/')
            }, 1000 )
            toast.success( "Logout successfully" );
            dispatch( setUser( null ) )
        } )
        .catch((error) => {
            console.log(error.code)
        })
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
              pauseOnFocusLoss
              draggable
          />
        <div className="w-[186px] h-full bg-primary py-[38px] text-white rounded-2xl flex flex-col justify-between text-center">
            
            <div className='relative group'>
                <img src={user?.photoURL ? user.photoURL : profile} width={100} className='rounded-full inline-block'/>
                <div className='bg-gray-100 opacity-0 w-[100px] grid place-content-center h-full rounded-full mx-auto absolute top-0 right-1/2 translate-x-1/2 group-hover:opacity-50 transform duration-200'>
                    <a href="#"><IoMdCloudUpload className='inline-block text-black' size={32}></IoMdCloudUpload></a>
                </div>
            </div>
            <div>
                <ul className='flex flex-col gap-y-[40px]'>
                    <MenuItem onClick={() => setActive({ ...active, home: true , comment: false , bell: false , setting: false })} className={active?.home ? 'activeLink' : 'link'} name="home" onMouseEnter={() => setHover({ ...hover, home: true })} onMouseLeave={() => setHover({ ...hover, home: false })}>{hover.home || active.home ? <AiFillHome className='inline-block' size={46}></AiFillHome> : <AiOutlineHome className='inline-block' size={46}></AiOutlineHome>}</MenuItem>
                    
                    <MenuItem onClick={() => setActive({ ...active, home: false , comment: true , bell: false , setting: false })} className={active?.comment ? 'activeLink' : 'link'} name="comment" onMouseEnter={()=> setHover({ ...hover, comment: true })} onMouseLeave={()=> setHover({ ...hover, comment: false })}>{hover.comment || active.comment ? <FaCommentDots className='inline-block' size={46}></FaCommentDots> : <FaRegCommentDots className='inline-block' size={46}></FaRegCommentDots>}</MenuItem>
                    
                    <MenuItem onClick={() => setActive({ ...active, home: false , comment: false , bell: true , setting: false })} className={active?.bell ? 'activeLink' : 'link'} name="bell" onMouseEnter={()=> setHover({ ...hover, bell: true })} onMouseLeave={()=>{ setHover({ ...hover, bell: false })}}>{hover?.bell || active.bell ? <AiFillBell className='inline-block' size={46}></AiFillBell> : <AiOutlineBell className='inline-block' size={46}></AiOutlineBell> }</MenuItem>
                    
                    <MenuItem onClick={() => setActive({ ...active, home: false , comment: false , bell: false , setting: true })} className={active?.setting ? 'activeLink' : 'link'} name="setting" onMouseEnter={()=>setHover({ ...hover, setting: true })} onMouseLeave={()=>{setHover({ ...hover, setting: false }) }}>{hover?.setting || active.setting ? <AiFillSetting className='inline-block' size={46}></AiFillSetting> : <AiOutlineSetting className='inline-block' size={46}></AiOutlineSetting> }</MenuItem>
                    
                </ul>
            </div>
            <div>
                <a href="#" onClick={logOut}><AiOutlineLogout className='inline-block' size={46}></AiOutlineLogout></a>
            </div>
        </div>
      
      </>
  )
}

export default Menu