import  { BiDotsVerticalRounded } from 'react-icons/bi'
/* eslint-disable react/prop-types */

const Box = (props) => {
  return (
    <div>
        <div className=" bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 ">
            <div className='flex items-center justify-between'>
                <h3 className='text-xl font-semibold'>{props.name}</h3>
                <span className="text-2xl text-primary"><BiDotsVerticalRounded></BiDotsVerticalRounded></span>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    </div>
  )
}

export default Box