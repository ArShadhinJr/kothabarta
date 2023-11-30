import { useState } from 'react'
import  { BiDotsVerticalRounded, BiDownArrow, BiUpArrow } from 'react-icons/bi'
/* eslint-disable react/prop-types */

const Box = ( props) => {
  const [close , setClose] = useState(window.innerWidth < 786 ? true : false)
  return (
    <div>
        <div className=" bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 ">
            <div className='flex items-center justify-between' >
              <h3 className='md:text-xl sm:text-base text-sm font-semibold' onClick={()=>{setClose(!close)}}>{props.name}</h3>
              <div className='flex items-center gap-x-3'>
                <span>{props.button}</span>
                <span onClick={()=>{setClose(!close)}} className="md:text-2xl sm:text-xl text-lg text-primary flex"> {window.innerWidth < 786 ? <>{close ? <BiDownArrow></BiDownArrow> : <BiUpArrow></BiUpArrow>}</> : null} <BiDotsVerticalRounded></BiDotsVerticalRounded> </span>
              </div>
            </div>
            {
              close ? null : <div>
                {props.children}
            </div>
            }
        </div>
    </div>
  )
}

export default Box