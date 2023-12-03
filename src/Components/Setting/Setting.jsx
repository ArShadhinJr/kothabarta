import { useSelector } from "react-redux"
import Menu from "../Menu/Menu"
import MenuMobile from "../MenuMobile/MenuMobile"
import Search from "../Search/Search"
import SettingBox from "../SettingBox/SettingBox"

const Setting = () => {
  return (
    <div className="md:px-[32px] sm:px-[24px] px-[8px] py-[35px] h-screen w-full flex">
      {
        window.innerWidth > 768 ? <Menu></Menu> : <MenuMobile></MenuMobile>
      }
      <div className="w-full md:flex md:ml-[43px] md:gap-x-[22px]">
        <div className="md:w-full md:h-full">
          <Search className="w-full md:mb-[20px] mb-1"></Search>
          <SettingBox></SettingBox>
        </div>
        
      </div>
    </div>
  )
}

export default Setting