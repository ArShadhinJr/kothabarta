import Box from "../Box/Box"
import { userListData } from "../../assets/Data/UserListData"
import Inner from "../Inner/Inner"


const UserList = () => {
  return (
    <Box name="User List">
        {
            userListData.map((item, index)=>{
                return (
                    <Inner key={index} src={item.src} name={item.name} dec={item.lastOnline}><button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">{item.btn}</button></Inner>
                )
            })
        }
    </Box>
  )
}

export default UserList