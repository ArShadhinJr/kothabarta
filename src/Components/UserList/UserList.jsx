import Box from "../Box/Box";
// import { userListData } from "../../assets/Data/UserListData"
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Inner from "../Inner/Inner";


const UserList = () => {

  const userInformation = useSelector( state => state.user.userInfo )
  // console.log(userInformation.uid)

  const db = getDatabase();
  const [ userData, setUserData ] = useState( [] )
  const [ friends, setFriends ] = useState( [] )
  
  

  useEffect( () => {
    const userRef = ref( db, 'users/' );
    onValue( userRef, ( snapshot ) => {
      // diclear an array 
      const userList = [];
    
      // show every data 
      snapshot.forEach( ( user ) => {
        // console.log(user.val())
        if ( user.key != userInformation.uid ) {
          userList.push( user.val() )
        }
      } )
      setUserData( userList )
    
    } );
  }, [] );


  useEffect( () => {
    const starCountRef = ref( db, 'friendRequests/' );
    const friends  = []
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach( ( item ) => {
        if ( (item.val().senderId === userInformation.email || item.val().receiverId  === userInformation.email)  ) {
        friends.push( item.val() )  
        }
        setFriends( friends )
})
});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends, userData] )
  
  
  const sendFriendRequest = (item) => {
      // const friendRequestRef = ref(db, "friendRequests/");

      // Generate a unique key for the friend request
      // const newFriendRequestRef = push(friendRequestRef);
      const friendReqData = ref(db, 'friendRequests/' );
      const friendReqNumber = []
      onValue(friendReqData, (snapshot) => {
        snapshot.forEach(( item ) => {
          friendReqNumber.push( { ...item.val(), userid: item.kye } )
        })
      } );
    
    
    
      // Set the friend request data
      set(push(ref(db, "friendRequests/")), {
        senderId: userInformation.email,
        receiverId: item.email,
        status: "pending",
        senderPhotoURL: userInformation.photoURL,
        photoURL: item.photoURL,
        senderName: userInformation.displayName,
        receverName: item.username,
        timestamp: Date.now(),
      });
    };
  

  return (
    <Box name="User List">
      {userData.map((item, index) => (
        <Inner key={index} classNameImg="md:w-[50px] w-[45px]" src={item.photoURL} name={item.username} dec={item.email}>
          {friends.some((friend) => friend.receiverId === item.email && friend.status === "pending") ? (
            <button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Cancel</button>
          ) : friends.some((friend) => friend.senderId === item.email && friend.status === "pending") ? (
            <button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Accept</button>
          ) : friends.some((friend) => (friend.receiverId === item.email || friend.senderId === item.email) && friend.status === "accept") ? (
            <button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Friend</button>
          ) : (
            <button onClick={() => sendFriendRequest(item)} className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Add</button>
          )}
        </Inner>
      ))}
    </Box>
  )
}

export default UserList