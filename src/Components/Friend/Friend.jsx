import Box from "../Box/Box"
// import { frienData } from "../../assets/Data/FriendData"
import Inner from "../Inner/Inner"
import { getDatabase, onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const Friend = () => {
  const db = getDatabase();
  const [ frienDataList, setFrienDataList ] = useState( [] )
  const userInformation = useSelector( state => state.user.userInfo )

  useEffect( () => {
    const userRef = ref( db, 'friendRequests/' );

    
    onValue( userRef, ( snapshot ) => {
      const frienData = []
      snapshot.forEach( ( friend ) => {
        if ( (friend.val().status === "accept" && friend.val().receiverId === userInformation.email) || (friend.val().status === "accept" && friend.val().senderId === userInformation.email) ) {
          
          frienData.push( friend.val() )
        }
      } )
      setFrienDataList( frienData )
    
    } )
  }, [])
  return (
    <Box name="Friend">
        {
            frienDataList.map((item, index )=>{
                return (
                    <Inner key={index} src={ userInformation.photoURL=== item.photoURL  ? item.senderPhotoURL : item.photoURL} name={userInformation.displayName === item.receverName ? item.senderName : item.receverName } dec={userInformation.email === item.receiverId ? item.senderId : item.receiverId}><h4 className="text-gray-500">2 minutes ago</h4></Inner>
                )
            })
        }
    </Box>
  )
}

export default Friend