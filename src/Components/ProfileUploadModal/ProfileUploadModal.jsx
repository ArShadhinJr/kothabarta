/* eslint-disable react/prop-types */

import { Cropper } from 'react-cropper';
import Button from '../Button/Button';
import DivCenter from './../DivCenter/DivCenter';
import { RxCross2 } from 'react-icons/rx';

const ProfileUploadModal = (props) => {
  return (
    <div className='absolute bg-black bg-opacity-0 w-full h-screen top-0 left-0 z-40'> 
      <div onClick={props.onClick} className='absolute bg-black bg-opacity-40 w-full h-screen top-0 left-0 z-30'></div>
      <DivCenter className=" md:w-[650px] sm:w-[400px] w-[350px] bg-white rounded-3xl p-6 z-40">
        <span onClick={props.onClick} className='absolute -right-2 -top-2 text-xl p-1 text-gray-100 cursor-pointer active:scale-75 transform transition-all duration-200 bg-slate-900 rounded-full'><RxCross2></RxCross2></span>
        <h3 className='text-2xl font-bold text-black'>Add or change your Kothabartha profile picture</h3>
        <input onChange={props.onChange} className="file:mr-4 file:px-10 file:py-3 file:text-xl file:border-0 file:rounded-lg file:font-semibold file:text-primary file:bg-violet-200 hover:file:bg-violet-100 hover:file:cursor-pointer block w-full text-xl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none my-5" id="file_input" type="file" />
        
        {
          props.image ? <div className='w-[100px] h-[100px] mx-auto '><div className="img-preview w-[100px] h-[100px] rounded-full overflow-hidden mx-auto mb-2 border border-primary"></div></div> : null
        }
        
        {
          props.image ?
          
          <Cropper
          ref={props.cropperRef}
          style={{ height: 200, width: "auto" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={props.image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} 
          guides={true}
        /> : null
        }

        
        
        <Button onClick={props.onPhotoUpload} className="bg-primary text-white text-xl font-bold mt-4">Upload</Button>
        <Button onClick={props.onClick} className="bg-red-500 text-white text-xl font-bold ms-4">Cencle</Button>

      </DivCenter>
    </div>
  )
}

export default ProfileUploadModal