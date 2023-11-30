
import FriendRequest from "../FriendRequest/FriendRequest"
import GroupList from "../GroupList/GroupList.jsx"
import Search from "../Search/Search"
import Unblock from "../Unblock/Unblock.jsx"
import SendRequest from "../SendRequest/SendRequest"

const HomeFirst = () => {
  return (
    <div className="w-full">
        <Search></Search>
        <SendRequest></SendRequest>
        <FriendRequest></FriendRequest>
        <Unblock></Unblock>
    </div>
  )
}

export default HomeFirst