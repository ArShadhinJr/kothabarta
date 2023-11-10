import HomeFirst from "../HomeFirst/HomeFirst"
import HomeSec from "../HomeSec/HomeSec"
import HomeThirth from "../HomeThirth/HomeThirth"
import Menu from "../Menu/Menu"
import MenuMobile from "../MenuMobile/MenuMobile"
const Homee = () => {
  return (
    <div className="px-[32px] py-[35px] h-screen w-full flex">
      {
        window.innerWidth > 768 ? <Menu></Menu> : <MenuMobile></MenuMobile>
      }
      <div className="w-full md:flex md:ml-[43px] md:gap-x-[22px]">
        <div className="md:w-4/12 md:h-full">
          <HomeFirst></HomeFirst>
        </div>
        <div className="md:w-4/12 md:h-full">
          <HomeSec></HomeSec>
        </div>
        <div className="md:w-4/12 md:h-full">
          <HomeThirth></HomeThirth>
        </div>
      </div>
    </div>
  )
}

export default Homee