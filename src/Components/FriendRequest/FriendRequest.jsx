import Box from "../Box/Box"
import Inner from "../Inner/Inner"
// import { friendReqData } from "../../assets/Data/FriendReqData"
import { getDatabase, onValue, ref } from "firebase/database"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const FriendRequest = () => {

  const userInformation = useSelector( state => state.user.userInfo )
  const db = getDatabase();
  const [friendRequestData, setFriendRequestData] = useState([])

  useEffect(()=>{
    const friendReqData = ref(db, 'friendRequests/' )
    const friendReqNumber = []
    onValue(friendReqData, (snapshot) => {
      snapshot.forEach(( item ) => {
        if( item.val().receiverId === userInformation.email ) {
          if( item.val().status === "pending" ) {
            friendReqNumber.push( item.val() )
          }
        }
      } )
      setFriendRequestData(friendReqNumber)
    } );
    console.log( friendReqNumber.length )
    
  }, [])

  return (
    <Box name="Friend Request">
        {
            friendRequestData.map((item, index)=>{
                return (
                    <Inner key={index} src={item.photoURL} name={item.username} dec={item.senderId}><button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Accept</button></Inner>
                )
            })
        }
    </Box>
  )
}

export default FriendRequest