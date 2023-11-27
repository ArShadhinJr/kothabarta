import Box from "../Box/Box"
// import { unblockUsersData } from "../../assets/Data/Unblock"
import Inner from "../Inner/Inner"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getDatabase, onValue, ref, update } from "firebase/database"

const Unblock = () => {
const db = getDatabase();
  const [ blockDataList, setBlockDataList ] = useState( [] )
  const userInformation = useSelector( state => state.user.userInfo )

  useEffect( () => {
    const userRef = ref( db, 'friendRequests/' );
    onValue( userRef, ( snapshot ) => {
      const blockData = []
      snapshot.forEach( ( block ) => {
        if ( (block.val().status === "blocked" && block.val().blockedBy === userInformation.email) || (block.val().status === "blocked" && block.val().blockedBy === userInformation.email) ) {
          blockData.push( block.val() )
        }
      } )
      setBlockDataList( blockData )
    
    } )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ blockDataList ] )

  const handleUnblcok = ( item) =>{
    const userRef = ref(db, 'friendRequests/');
    onValue(userRef, (snapshot) => {
    snapshot.forEach((user) => {
      if ( (user.val().status === "blocked") &&  (user.val().blockedBy === userInformation.email) && (user.val().blockedId === item.receiverId || user.val().blockedId === item.senderId ) ) {
        update(ref(db, 'friendRequests/' + user.key ), {
          status: "accept", 
          blockedBy: "", 
          blockedId: ""
        })
      }
    })
    
    });
  }



  return (
    <Box name="Block Users">
        {
            blockDataList.map((item, index)=>{
                return (
                  <Inner key={index} src={item.photoURL} name={item.receverName} dec={item.receiverId} >
                    <button onClick={() => handleUnblcok( item )} className=" bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Unblock</button>
                  </Inner>
                )
            })
        }
    </Box>
  )
}

export default Unblock