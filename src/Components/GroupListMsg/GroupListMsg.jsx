import Box from "../Box/Box"
// import { groupList } from "../../assets/Data/GroupList"
import Inner from "../Inner/Inner"
import { getDatabase, ref,   onValue} from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { groupList } from './../../assets/Data/GroupList';

const GroupListMsg = () => {

  const userInformation = useSelector( state => state.user.userInfo )
  const db = getDatabase();
  const [groupList, setGroupList] = useState([])

  useEffect(()=>{
    const groupList = ref(db, 'groups/' )
    const myGroupList = []
    onValue(groupList, (snapshot) => {
      snapshot.forEach(( item ) => {
        myGroupList.push( item.val() )
      } )
      setGroupList(myGroupList)
    } );
  })

  return (
    <Box name="Group List" button={<button className="bg-white text-primary border border-primary px-5 py-1 rounded-lg active:scale-95">Create Group</button>}>
        {
            groupList.map((item, index)=>{
                return (
                    <Inner key={index} src={item.groupPhoto} name={item.groupName} dec={item.groupDesc}>
                      {
                        groupList[index].admin === userInformation.email ? <button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Edit</button> : <button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Join</button>
                      }
                    </Inner>
                )
            })
        }
    </Box>
  )
}

export default GroupListMsg