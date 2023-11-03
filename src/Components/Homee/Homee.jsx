import HomeFirst from "../HomeFirst/HomeFirst"
import HomeSec from "../HomeSec/HomeSec"
import HomeThirth from "../HomeThirth/HomeThirth"
import Menu from "../Menu/Menu"
const Homee = () => {
  return (
    <div className="px-[32px] py-[35px] h-screen w-full flex">
      <Menu />
      <div className="w-full md:flex md:ml-[43px] md:gap-x-[22px]">
        <div className="w-4/12 h-full">
          <HomeFirst></HomeFirst>
        </div>
        <div className="w-4/12 h-full">
          <HomeSec></HomeSec>
        </div>
        <div className="w-4/12 h-full">
          <HomeThirth></HomeThirth>
        </div>
      </div>
    </div>
  )
}

export default Homee