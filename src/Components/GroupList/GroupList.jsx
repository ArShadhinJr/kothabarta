import Box from "../Box/Box"
import { groupList } from "../../assets/Data/GroupList"
import Inner from "../Inner/Inner"

const GroupList = () => {
  return (
    <Box name="Group List">
        {
            groupList.map((item, index) => {
                return (
                    <Inner key={index} src={item.src} name={item.name} dec={item.dec}><button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">{item.btn}</button></Inner>
                )
            })
        }
    </Box>
  )
}

export default GroupList