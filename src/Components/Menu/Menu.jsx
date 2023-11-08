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
import { createRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signOut, updateProfile } from 'firebase/auth'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { setUser } from '../../Slices/userSlice'
import ProfileUploadModal from '../ProfileUploadModal/ProfileUploadModal'
// upload to firebase with file 
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import "cropperjs/dist/cropper.css";

const Menu = () => {

    const storage = getStorage();
    
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();
    
    
    const user = useSelector( ( state ) => state.user.userInfo )
    const storageRef = ref( storage, (user?.uid ? user?.uid : "image") );
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
    } )
    
    const [showModal , setShowModal] = useState(false)

    const handlePhoto = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if ( typeof cropperRef.current?.cropper !== "undefined" ) {
            setCropData( cropperRef.current?.cropper.getCroppedCanvas().toDataURL() );

            const message = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message, 'data_url').then((snapshot) => {
              getDownloadURL(storageRef).then((downloadURL) => {
                  updateProfile(auth.currentUser, {
                      photoURL: downloadURL 
                  } )
                  .then(() => {
                      dispatch( setUser( { ...user, photoURL: downloadURL } ) )
                      localStorage.setItem( 'user', JSON.stringify( { ...user, photoURL: downloadURL } ) )
                      
                      toast.success( "Update Profile Picture Successfully" );
                      setShowModal( false )
                      setImage( "" )
                  })
              } );
                
            }); 
        }
    }; 

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
        {
            showModal ? <ProfileUploadModal image={image} cropperRef={cropperRef} onChange={handlePhoto} onPhotoUpload={getCropData} onClick={() => setShowModal(false)}></ProfileUploadModal> :  null
        }
        <div className="w-[186px] h-full bg-primary py-[38px] text-white rounded-2xl flex flex-col justify-between text-center">
            
            <div className='relative group'>
                <img src={user?.photoURL ? user.photoURL : profile} width={100} className='rounded-full inline-block'/>
                
                <div className='bg-black bg-opacity-25 w-[100px] opacity-0 flex items-center justify-center h-full rounded-full mx-auto absolute top-0 right-1/2 translate-x-1/2 transform transition-all duration-200 group-hover:opacity-100'>
                    <a href="#"><IoMdCloudUpload onClick={() => setShowModal(true)} className='inline-block text-white' size={24}></IoMdCloudUpload></a>
                </div>
                <p  className='absolute -bottom-8 left-1/2 -translate-x-1/2 w-full'>{user?.displayName}</p>
            </div>
            <div>
                <ul className='flex flex-col gap-y-[40px]'>
                    <MenuItem to='/homee' onClick={() => setActive({ ...active, home: true , comment: false , bell: false , setting: false })} className={active?.home ? 'activeLink' : 'link'} name="home" onMouseEnter={() => setHover({ ...hover, home: true })} onMouseLeave={() => setHover({ ...hover, home: false })}>{hover.home || active.home ? <AiFillHome className='inline-block' size={46}></AiFillHome> : <AiOutlineHome className='inline-block' size={46}></AiOutlineHome>}</MenuItem>
                    
                    <MenuItem onClick={() => setActive({ ...active, home: false , comment: true , bell: false , setting: false })} className={active?.comment ? 'activeLink' : 'link'} name="comment" onMouseEnter={()=> setHover({ ...hover, comment: true })} onMouseLeave={()=> setHover({ ...hover, comment: false })}>{hover.comment || active.comment ? <FaCommentDots className='inline-block' size={46}></FaCommentDots> : <FaRegCommentDots className='inline-block' size={46}></FaRegCommentDots>}</MenuItem>
                    
                    <MenuItem onClick={() => setActive({ ...active, home: false , comment: false , bell: true , setting: false })} className={active?.bell ? 'activeLink' : 'link'} name="bell" onMouseEnter={()=> setHover({ ...hover, bell: true })} onMouseLeave={()=>{ setHover({ ...hover, bell: false })}}>{hover?.bell || active.bell ? <AiFillBell className='inline-block' size={46}></AiFillBell> : <AiOutlineBell className='inline-block' size={46}></AiOutlineBell> }</MenuItem>
                    
                    <MenuItem onClick={() => setActive({ ...active, home: false , comment: false , bell: false , setting: true })} className={active?.setting ? 'activeLink' : 'link'} name="setting" onMouseEnter={()=>setHover({ ...hover, setting: true })} onMouseLeave={()=>{setHover({ ...hover, setting: false }) }}>{hover?.setting || active.setting ? <AiFillSetting className='inline-block' size={46}></AiFillSetting> : <AiOutlineSetting className='inline-block' size={46}></AiOutlineSetting> }</MenuItem>
                    <Outlet />
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