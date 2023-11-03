import Box from "../Box/Box"
import Inner from "../Inner/Inner"
import { friendReqData } from "../../assets/Data/FriendReqData"

const FriendRequest = () => {

  return (
    <Box name="Friend Request">
        {
            friendReqData.map((item, index)=>{
                return (
                    <Inner key={index} src={item.src} name={item.name} dec={item.dec}><button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">{item.btn}</button></Inner>
                )
            })
        }
    </Box>
  )
}

export default FriendRequest