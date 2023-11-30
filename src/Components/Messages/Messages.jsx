import Menu from "../Menu/Menu"
import MenuMobile from "../MenuMobile/MenuMobile"
import MessagesBox from "../MessagesBox/MessagesBox"
import MessagesFirst from "../MessagesFirst/MessagesFirst"

const Messages = () => {
  return (
    <div className="md:px-[32px] sm:px-[24px] px-[8px] py-[35px] h-screen w-full flex">
      {
        window.innerWidth > 768 ? <Menu></Menu> : <MenuMobile></MenuMobile>
      }
      <div className="w-full md:flex md:ml-[43px] md:gap-x-[22px]">
        <div className="md:w-4/12 md:h-full">
          <MessagesFirst></MessagesFirst>
        </div>
        <MessagesBox></MessagesBox>
      </div>
    </div>
  )
}

export default Messages