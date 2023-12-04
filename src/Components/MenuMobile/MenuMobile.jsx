import { createRef, useState , useEffect } from "react"
import MenuItem from "../MenuItem/MenuItem"
import { AiFillBell, AiFillHome, AiFillSetting, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'
import { Outlet, useLocation } from "react-router-dom"
import { FaCommentDots, FaRegCommentDots } from "react-icons/fa"
import logo from '../../assets/images/logo-dark.png'
import profile from '../../assets/images/profile.jpg'
import { useDispatch, useSelector } from "react-redux"
import ProfileUploadModal from "../ProfileUploadModal/ProfileUploadModal"
import { IoMdCloudUpload } from "react-icons/io"
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage"
import { getAuth, updateProfile } from "firebase/auth"
import { setUser } from "../../Slices/userSlice"
import { toast } from "react-toastify"


const MenuMobile = () => {
    const storage = getStorage();
    
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();

    const [ showModal, setShowModal ] = useState( false )
    
    const user = useSelector( state => state.user.userInfo )

    const storageRef = ref( storage, (user?.uid ? user?.uid : "image") );
    const auth = getAuth()
    const dispatch = useDispatch()

    const [active , setActive ] = useState( {
        home: false,
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

    const location = useLocation()
    useEffect(()=>{
        const currentPath = location.pathname
        if(currentPath === '/homee'){
            setActive( {
                home: true,
                comment: false,
                bell: false,
                setting: false,
            } )
        } else if(currentPath === '/messages'){
            setActive( {
                home: false,
                comment: true,
                bell: false,
                setting: false,
            })
        } else if(currentPath === '/notification'){
            setActive( {
                home: false,
                comment: false,
                bell: true,
                setting: false,
            })
        } else if(currentPath === '/setting'){
            setActive( {
                home: false,
                comment: false,
                bell: false,
                setting: true,
            })
        }
    }, [location])

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
    console.log(user.photoURL)
  return (
    <div>
        <div className="fixed top-0 right-0 bg-primary p-4 z-10 w-full text-white flex items-center justify-between">
            {
            showModal ? <ProfileUploadModal image={image} cropperRef={cropperRef} onChange={handlePhoto} onPhotoUpload={getCropData} onClick={() => setShowModal(false)}></ProfileUploadModal> :  null
            }
            <div>
                <img src={logo} className="w-[45px]" />
            </div>
            <div className='relative group'>
                <img src={user?.photoURL ? user?.photoURL : profile} width={45} className='rounded-full inline-block'/>
                
                <div className='bg-black bg-opacity-25 w-[45px] opacity-0 flex items-center justify-center h-full rounded-full mx-auto absolute top-0 right-1/2 translate-x-1/2 transform transition-all duration-200 group-hover:opacity-100'>
                    <a href="#"><IoMdCloudUpload onClick={() => setShowModal(true)} className='inline-block text-white' size={24}></IoMdCloudUpload></a>
                </div>
                {window.innerWidth >= 1024 ? <p className='absolute -bottom-8 left-1/2 -translate-x-1/2 w-full' >{user?.displayName}</p>: null}
            </div>
        </div>
        <div className="fixed bottom-0 right-0 bg-primary p-4 pt-0 z-10 w-full text-white">
            <ul className='flex items-center justify-around'>
                <MenuItem to='/homee' onClick={() => setActive({ ...active, home: true , comment: false , bell: false , setting: false })} className={active?.home ? 'moblieActiveLink' : 'moblieLink'} name="home" onMouseEnter={() => setHover({ ...hover, home: true })} onMouseLeave={() => setHover({ ...hover, home: false })}>{hover.home || active.home ? <AiFillHome className='inline-block' size={30}></AiFillHome> : <AiOutlineHome className='inline-block' size={30}></AiOutlineHome>}</MenuItem>
                
                <MenuItem to='/messages' onClick={() => setActive({ ...active, home: false , comment: true , bell: false , setting: false })} className={active?.comment ? 'moblieActiveLink' : 'moblieLink'} name="comment" onMouseEnter={()=> setHover({ ...hover, comment: true })} onMouseLeave={()=> setHover({ ...hover, comment: false })}>{hover.comment || active.comment ? <FaCommentDots className='inline-block' size={30}></FaCommentDots> : <FaRegCommentDots className='inline-block' size={30}></FaRegCommentDots>}</MenuItem>
                    
                <MenuItem to='/notification' onClick={() => setActive({ ...active, home: false , comment: false , bell: true , setting: false })} className={active?.bell ? 'moblieActiveLink' : 'moblieLink'} name="bell" onMouseEnter={()=> setHover({ ...hover, bell: true })} onMouseLeave={()=>{ setHover({ ...hover, bell: false })}}>{hover?.bell || active.bell ? <AiFillBell className='inline-block' size={30}></AiFillBell> : <AiOutlineBell className='inline-block' size={30}></AiOutlineBell> }</MenuItem>
                    
                <MenuItem to='/setting' onClick={() => setActive({ ...active, home: false , comment: false , bell: false , setting: true })} className={active?.setting ? 'moblieActiveLink' : 'moblieLink'} name="setting" onMouseEnter={()=>setHover({ ...hover, setting: true })} onMouseLeave={()=>{setHover({ ...hover, setting: false }) }}>{hover?.setting || active.setting ? <AiFillSetting className='inline-block' size={30}></AiFillSetting> : <AiOutlineSetting className='inline-block' size={30}></AiOutlineSetting> }</MenuItem>
                <Outlet />
            </ul>
        </div>
          
    </div>
  )
}

export default MenuMobile