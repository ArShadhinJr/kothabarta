import { useState } from "react";
import { TbTriangleFilled } from "react-icons/tb";

const MsgReceiverImg = () => {
    const [ timeHover, setTimeHover ] = useState( false )
    
  return (
    <div >
          <div className="flex items-center justify-start mt-4">
            <div onClick={() => setTimeHover(!timeHover)} className="text-left bg-[#F1F1F1] py-[13px] px-[20px] relative font-poppins rounded-[8px] ml-3 max-w-[70%] float-left">
              <img src="https://t4.ftcdn.net/jpg/03/17/25/45/240_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg" />
              <TbTriangleFilled className="text-[#F1F1F1] absolute -left-3 -bottom-[.15rem] text-2xl"></TbTriangleFilled>
            </div>
          </div>
          {
            timeHover ? <p className="text-xs text-gray-500 ml-3 mt-2">Today, 2:01pm</p> : null
          }
        </div>
  )
}

export default MsgReceiverImg