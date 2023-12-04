import { AiOutlineSearch } from "react-icons/ai"
import {BiDotsVerticalRounded}  from "react-icons/bi"

const Search = () => {
  return (
    <div className={`flex items-center justify-between border rounded-[20px] px-[23px] py-[20px] bg-white drop-shadow-l md:mt-0 mt-[54px] mb-[20px]`}>
        <div className="flex items-center">
            <span className="text-2xl pr-[32px]"><AiOutlineSearch></AiOutlineSearch></span>
            <input type="text" placeholder="search" className="outline-none focus:outline-none"/>
        </div>
        <span className="text-2xl text-primary"><BiDotsVerticalRounded></BiDotsVerticalRounded></span>
    </div>
  )
}

export default Search