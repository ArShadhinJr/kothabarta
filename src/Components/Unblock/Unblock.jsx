import Box from "../Box/Box"
import { unblockUsersData } from "../../assets/Data/Unblock"
import Inner from "../Inner/Inner"

const Unblock = () => {
  return (
    <Box name="Unblock Users">
        {
            unblockUsersData.map((item, index)=>{
                return (
                    <Inner key={index} src={item.src} name={item.name} dec={item.lastOnline}><button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">{item.btn}</button></Inner>
                )
            })
        }
    </Box>
  )
}

export default Unblock