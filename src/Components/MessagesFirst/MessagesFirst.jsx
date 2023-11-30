import Friend from "../Friend/Friend"
import GroupListMsg from "../GroupListMsg/GroupListMsg"
import Search from "../Search/Search"


const MessagesFirst = () => {
  return (
    <div className="w-full">
        <Search></Search>
        <Friend></Friend>
        <GroupListMsg></GroupListMsg>
    </div>
  )
}

export default MessagesFirst