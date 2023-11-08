import Box from "../Box/Box"
// import { userListData } from "../../assets/Data/UserListData"
import Inner from "../Inner/Inner"
import { getDatabase, ref,   onValue, push, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';


const UserList = () => {

  const userInformation = useSelector( state => state.user.userInfo )
  // console.log(userInformation.uid)

  const db = getDatabase();
  const [userData, setUserData] = useState([])

  useEffect( () => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
    // diclear an array 
    const userList = [];
    
    // show every data 
    snapshot.forEach((user) => {
      // console.log(user.val())
      if ( user.key != userInformation.uid ) {
        userList.push( user.val() )
      }
    })
    setUserData(userList)
    
    });
  }, [] )

  // const userShow =() =>{
  //   userData.map( ( item ) => {
  //     console.log(item)
  //   })
  // } 
  // userShow()
  
  const sendFriendRequest = (item) => {
      // const friendRequestRef = ref(db, "friendRequests/");

      // Generate a unique key for the friend request
      // const newFriendRequestRef = push(friendRequestRef);
      const friendReqData = ref(db, 'friendRequests/' );
      const friendReqNumber = []
      onValue(friendReqData, (snapshot) => {
        snapshot.forEach(( item ) => {
          friendReqNumber.push(item.val())
        })
      } );
      console.log(friendReqNumber.length)
    
    
      // Set the friend request data
      set(ref(db, "friendRequests/" + (Math.random() * 10000000000).toFixed(0)), {
        senderId: userInformation.email,
        receiverId: item.email,
        status: "pending",
        senderPhotoURL: userInformation.photoURL,
        photoURL: item.photoURL,
        senderName: userInformation.disp,
        receverName: item.username,
        timestamp: Date.now(),
      });

      console.log("Friend request sent");
    };
  

  return (
    <Box name="User List">
        {
            userData.map((item, index)=>{
                return (
                    <Inner key={index}  src={item.photoURL} name={item.username} dec={item.email}><button onClick={()=>sendFriendRequest(item)} className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">+</button></Inner>
                )
            })
        }
    </Box>
  )
}

export default UserList