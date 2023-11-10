import { useState } from "react"
import MenuItem from "../MenuItem/MenuItem"
import { AiFillBell, AiFillHome, AiFillSetting, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'
import { Outlet } from "react-router-dom"
import { FaCommentDots, FaRegCommentDots } from "react-icons/fa"
import logo from '../../assets/images/logo-dark.png'
import { useSelector } from "react-redux"


const MenuMobile = () => {

    const [active , setActive ] = useState( {
        home: true,
        comment: false,
        bell: false,
        setting: false,
    } )
    const [ hover, setHover ] = useState( {
        home: false,
        comment: false,
        bell: false,
        setting: false,
    } )
    const user = useSelector( state => state.user.userInfo )
    console.log(user.photoURL)
  return (
    <div>
        <div className="fixed top-0 right-0 bg-primary p-4 z-10 w-full text-white flex items-center justify-between">
            <div>
                <img src={logo} className="w-[45px]" />
            </div>
            <div>
                <img src={user?.photoURL} className="w-[45px] rounded-full" />
            </div>
        </div>
        <div className="fixed bottom-0 right-0 bg-primary p-4 pt-0 z-10 w-full text-white">
            <ul className='flex items-center justify-around'>
                <MenuItem to='/homee' onClick={() => setActive({ ...active, home: true , comment: false , bell: false , setting: false })} className={active?.home ? 'moblieActiveLink' : 'moblieLink'} name="home" onMouseEnter={() => setHover({ ...hover, home: true })} onMouseLeave={() => setHover({ ...hover, home: false })}>{hover.home || active.home ? <AiFillHome className='inline-block' size={30}></AiFillHome> : <AiOutlineHome className='inline-block' size={30}></AiOutlineHome>}</MenuItem>
                
                <MenuItem onClick={() => setActive({ ...active, home: false , comment: true , bell: false , setting: false })} className={active?.comment ? 'moblieActiveLink' : 'moblieLink'} name="comment" onMouseEnter={()=> setHover({ ...hover, comment: true })} onMouseLeave={()=> setHover({ ...hover, comment: false })}>{hover.comment || active.comment ? <FaCommentDots className='inline-block' size={30}></FaCommentDots> : <FaRegCommentDots className='inline-block' size={30}></FaRegCommentDots>}</MenuItem>
                    
                <MenuItem onClick={() => setActive({ ...active, home: false , comment: false , bell: true , setting: false })} className={active?.bell ? 'moblieActiveLink' : 'moblieLink'} name="bell" onMouseEnter={()=> setHover({ ...hover, bell: true })} onMouseLeave={()=>{ setHover({ ...hover, bell: false })}}>{hover?.bell || active.bell ? <AiFillBell className='inline-block' size={30}></AiFillBell> : <AiOutlineBell className='inline-block' size={30}></AiOutlineBell> }</MenuItem>
                    
                <MenuItem onClick={() => setActive({ ...active, home: false , comment: false , bell: false , setting: true })} className={active?.setting ? 'moblieActiveLink' : 'moblieLink'} name="setting" onMouseEnter={()=>setHover({ ...hover, setting: true })} onMouseLeave={()=>{setHover({ ...hover, setting: false }) }}>{hover?.setting || active.setting ? <AiFillSetting className='inline-block' size={30}></AiFillSetting> : <AiOutlineSetting className='inline-block' size={30}></AiOutlineSetting> }</MenuItem>
                <Outlet />
            </ul>
        </div>
          
    </div>
  )
}

export default MenuMobile