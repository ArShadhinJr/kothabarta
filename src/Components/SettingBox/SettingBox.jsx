import { useSelector } from 'react-redux'
import SettingItem from '../SettingItem/SettingItem'
import { MdAddPhotoAlternate, MdComment, MdDriveFileRenameOutline, MdKey, MdOutlineHelpOutline , MdOutlineIncompleteCircle, MdDelete   } from 'react-icons/md';


const SettingBox = () => {

    const userInformation = useSelector(state => state.user.userInfo)

  return (
    <div className='flex md:flex-row flex-col md:gap-x-8 md:h-11/12'>
       <div className="md:w-1/2 md:h-full overflow-hidden bg-white border rounded-[20px] px-[40px] py-[10px] drop-shadow-lg">
            <div className="h-1/12 flex items-center">
                <h3 className='text-xl font-bold text-black'>Profile Settings</h3>
            </div>
              <div className=' h-11/12 px-[42px] '>
                <div className="flex items-center gap-x-[20px]">
                        <div >
                            <img src={userInformation.photoURL} className= {`rounded-full  md:w-[100px] w-[60px]`} />
                        </div>
                        <div>
                            <h3 className="md:text-2xl sm:text-xl text-base font-bold">{userInformation.displayName}</h3>
                            <p className="md:text-xl sm-text-base text-sm text-gray-500">Stay tuned</p>
                        </div>
                    </div>
                <hr className='my-[23px]'/>
                <div className='px-[40px] pt-[20px] pb-[43px]'>
                    <ul className='flex flex-col gap-y-4'>
                        {/* <SettingItem icon={<MdDriveFileRenameOutline />} name="Edit Profile Name." />
                        <SettingItem icon={<MdComment />} name="Edit Profile Status Info." />
                        <SettingItem icon={<MdAddPhotoAlternate />} name="Help." />
                        <SettingItem icon={<MdOutlineHelpOutline />} name="Edit Profile Photo." /> */}
                          <SettingItem icon={<MdDriveFileRenameOutline />} name="Edit Profile Name." />
                          <SettingItem icon={<MdComment />} name="Edit Profile Status Info." />
                          <SettingItem icon={<MdAddPhotoAlternate />} name="Edit Profile Photo." />
                          <SettingItem icon={<MdOutlineHelpOutline />} name="Edit Profile Photo." />
                    </ul>
                </div>
                
                
            </div>
        </div>
          <div className="md:w-1/2 md:h-full overflow-hidden bg-white border rounded-[20px] px-[40px] py-[10px] drop-shadow-lg">
              <div className="h-1/12 flex items-center">
                <h3 className='text-xl font-bold text-black'>Account Settings</h3>
            </div>
              <div className='px-[40px] pt-[20px] pb-[43px]'>
                    <ul className='flex flex-col gap-y-4'>
                      <SettingItem icon={<MdKey />} name="Change Password" />
                      <SettingItem icon={<MdOutlineIncompleteCircle />} name="Theme." />
                      <SettingItem icon={<MdDelete  />} name="Delete Account." />
                    </ul>
                </div>
        </div>
    </div>
  )
}

export default SettingBox