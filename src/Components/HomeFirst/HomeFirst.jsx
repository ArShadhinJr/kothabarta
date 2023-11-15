
import FriendRequest from "../FriendRequest/FriendRequest"
import GroupList from "../GroupList/GroupList.jsx"
import Search from "../Search/Search"

const HomeFirst = () => {
  return (
    <div className="w-full">
        <Search></Search>
        <GroupList></GroupList>
        <FriendRequest></FriendRequest>
    </div>
  )
}

export default HomeFirst