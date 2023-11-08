import Box from "../Box/Box"
import { groupList } from "../../assets/Data/GroupList"
import Inner from "../Inner/Inner"
import { getDatabase, ref,   onValue, push, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GroupList = () => {

  const userInformation = useSelector( state => state.user.userInfo )
  const db = getDatabase();
  const [requestList, setRequestList] = useState([])

  useEffect(() => {
    const starCountRef = ref( db, 'friendRequests/' );
    const sendRequestList  = []
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach( ( item ) => {
        
        if ( item.val().senderId === userInformation.email ) {
          if( item.val().status === "pending" ) {
          sendRequestList.push( item.val() )
        }
        }
        setRequestList( sendRequestList )
        console.log(sendRequestList)
})
});
  }, [])

  return (
    <Box name="Send Request">
        {
            requestList.map((item, index) => {
                return (
                    <Inner key={index} src={item.photoURL} name={item.receverName} dec={item.receiverId}><button  className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Cencle</button></Inner>
                )
            })
        }
    </Box>
  )
}

export default GroupList