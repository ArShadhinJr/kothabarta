import Box from "../Box/Box"
import { frienData } from "../../assets/Data/FriendData"
import Inner from "../Inner/Inner"


const Friend = () => {
  return (
    <Box name="Friend">
        {
            frienData.map((item, index )=>{
                return (
                    <Inner key={index} src={item.src} name={item.name} dec={item.dec}><h4 className="text-gray-500">{item.lastOnline}</h4></Inner>
                )
            })
        }
    </Box>
  )
}

export default Friend