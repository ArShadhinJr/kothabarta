import Box from "../Box/Box"
import { userListData } from "../../assets/Data/UserListData"
import Inner from "../Inner/Inner"
import { getDatabase, ref, onValue } from "firebase/database";
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
      console.log(user.val())
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
  

  return (
    <Box name="User List">
        {
            userData.map((item, index)=>{
                return (
                    <Inner key={index}  src={item.photoURL} name={item.username} dec={item.email}><button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">+</button></Inner>
                )
            })
        }
    </Box>
  )
}

export default UserList