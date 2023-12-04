import { useSelector } from "react-redux"
import Menu from "../Menu/Menu"
import MenuMobile from "../MenuMobile/MenuMobile"
import Search from "../Search/Search"
import NotificationBox from "../NotificationBox/NotificationBox"

const Notification = () => {
  const userMsgItem = useSelector( state => state.userMsg.userMsg )
  return (
    <div className="md:px-[32px] sm:px-[24px] px-[8px] py-[35px] h-screen w-full flex">
      {
        window.innerWidth > 768 ? <Menu></Menu> : <MenuMobile></MenuMobile>
      }
      <div className="w-full md:flex md:ml-[43px] md:gap-x-[22px]">
        <div className="md:w-full md:h-full">
          {
            window.innerWidth > 768 ? <Search className="w-full md:mb-[20px] mb-1"></Search> : null
          }
          <NotificationBox></NotificationBox>
        </div>
        
      </div>
    </div>
  )
}

export default Notification