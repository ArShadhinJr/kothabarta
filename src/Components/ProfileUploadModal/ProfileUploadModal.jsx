
import Button from '../Button/Button';
import DivCenter from './../DivCenter/DivCenter';
import { RxCross2 } from 'react-icons/rx';

const ProfileUploadModal = (props) => {
  return (
    <div className='absolute bg-black bg-opacity-40 w-full h-screen top-0 left-0 z-40'>
      <DivCenter className=" bg-white rounded-3xl p-6 z-50">
        <span onClick={props.onClick} className='absolute right-4 top-2 text-2xl text-gray-600 cursor-pointer'><RxCross2></RxCross2></span>
            <h3 className='text-2xl font-bold '>Add or change your Kothabartha profile picture</h3>
            <input className="file:mr-4 file:px-10 file:py-3 file:text-xl file:border-0 file:rounded-lg file:font-semibold file:text-primary file:bg-violet-200 hover:file:bg-violet-100 hover:file:cursor-pointer block w-full text-xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none my-5" id="file_input" type="file"/>
            <Button className="bg-primary text-white text-xl font-bold">Upload</Button>
            <Button onClick={props.onClick} className="bg-red-500 text-white text-xl font-bold ms-4">Cencle</Button>

        </DivCenter>
    </div>
  )
}

export default ProfileUploadModal