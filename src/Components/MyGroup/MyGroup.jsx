import Box from "../Box/Box"
import { myGroupData } from "../../assets/Data/MyGroupData"
import Inner from "../Inner/Inner"


const MyGroup = () => {
  return (
    <Box name="My Group">
        {
            myGroupData.map((item, index)=>{
                return (
                    <Inner key={index} src={item.src} name={item.name} dec={item.dec}><h4 className="text-gray-500">{item.lastOnline}</h4></Inner>
                )
            })
        }
    </Box>
  )
}

export default MyGroup