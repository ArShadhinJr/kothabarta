import Box from "../Box/Box"
// import { frienData } from "../../assets/Data/FriendData"
import Inner from "../Inner/Inner"
import { get, getDatabase, onValue, ref, update } from "firebase/database"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MdBlock } from "react-icons/md"
import { BiSolidMessageDots } from "react-icons/bi";
import { setUserMsg } from "../../Slices/userMsgSlice"



const Friend = () => {
  const dispatch = useDispatch()
  const db = getDatabase();
  const [ frienDataList, setFrienDataList ] = useState( [] )
  const userInformation = useSelector( state => state.user.userInfo )

  const handleMsgUser = async ( item ) => {
    dispatch( setUserMsg( item ) )

    localStorage.setItem( 'userMsg', JSON.stringify( item ) ) 

    
  }

useEffect(() => {
  const userRef = ref(db, 'friendRequests/');

  onValue(userRef, (snapshot) => {
    const frienData = [];
    snapshot.forEach((friend) => {
      if ((friend.val().status === "accept" && friend.val().receiverId === userInformation.email) || (friend.val().status === "accept" && friend.val().senderId === userInformation.email)) {
        frienData.push(friend.val());
      }
    });

    // Use callback form of setFrienDataList to ensure you're working with the latest state
    setFrienDataList((prevData) => {
      if (JSON.stringify(prevData) !== JSON.stringify(frienData)) {
        return frienData;
      }
      return prevData;
    });
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [db, userInformation]);

  
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
                    <div className="flex items-center">
                      {/* send messege button */}
                    <button onClick={ ()=>handleMsgUser(item)} title="send message" className=" text-4xl text-primary pe-1 rounded-lg active:scale-95"><BiSolidMessageDots/></button>
                    {/* user block button */}
                    <button title="block user" onClick={()=>handleBlock(item)} className=" bg-primary text-2xl text-white px-1 py-1 rounded-lg active:scale-95"><MdBlock/></button>
                    </div>
                    </Inner>
                )
            })
        }
    </Box>
  )
}

export default Friend