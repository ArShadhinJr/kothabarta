import { useState } from "react";
import { TbTriangleFilled } from "react-icons/tb";
import sunset from '../../assets/images/sunset.jpg'

const MsgSenderImg = () => {
    const [ timeHover, setTimeHover ] = useState( false )
    
  return (
    <div>
          <div className="flex items-center justify-end mt-4">
          <div onClick={() => setTimeHover(!timeHover)} className="text-right bg-primary text-white py-[13px] px-[20px] relative font-poppins rounded-[8px] mr-3 max-w-[70%] float-right">
            <img src={sunset} />
            <TbTriangleFilled className="text-primary absolute -right-3 -bottom-[.15rem] text-2xl"></TbTriangleFilled>
          </div>
          </div>
          {
            timeHover ? <p className="text-xs text-gray-500 mr-3 mt-2 text-right">Today, 2:01pm</p> : null
          }
    </div>
  )
}

export default MsgSenderImg