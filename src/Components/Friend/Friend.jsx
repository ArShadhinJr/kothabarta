import Box from "../Box/Box"
// import { frienData } from "../../assets/Data/FriendData"
import Inner from "../Inner/Inner"
import { get, getDatabase, onValue, ref, update } from "firebase/database"
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ db, userInformation, frienDataList ] )
  
const handleBlock = async (item) => {
  const userRef = ref(db, 'friendRequests/');

  try {
    const snapshot = await get(userRef);

    const updatePromises = [];

    snapshot.forEach((user) => {
      if (user.val().senderId === item.senderId && user.val().receiverId === userInformation.email) {
        updatePromises.push(update(ref(db, 'friendRequests/' + user.key), {
          status: "blocked",
          blockedBy: userInformation.email,
          blockedId: user.val().senderId
        }));
      } else if (user.val().senderId === userInformation.email && user.val().receiverId === item.receiverId) {
        updatePromises.push(update(ref(db, 'friendRequests/' + user.key), {
          status: "blocked",
          blockedBy: userInformation.email,
          blockedId: user.val().receiverId
        }));
      }
    });

    // Wait for all update operations to complete
    await Promise.all(updatePromises);

  } catch (error) {
    console.error("Error fetching/updating Firebase:", error);
  }
};

  return (
    <Box name="Friend">
        {
            frienDataList.map((item, index )=>{
                return (
                    <Inner key={index} src={ userInformation.photoURL=== item.photoURL  ? item.senderPhotoURL : item.photoURL} name={userInformation.displayName === item.receverName ? item.senderName : item.receverName } dec={userInformation.email === item.receiverId ? item.senderId : item.receiverId}>
                    {/* user block button */}
                    <button onClick={()=>handleBlock(item)} className=" bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Block</button>
                    </Inner>
                )
            })
        }
    </Box>
  )
}

export default Friend