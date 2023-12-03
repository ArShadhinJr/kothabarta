import Box from "../Box/Box"
// import { groupList } from "../../assets/Data/GroupList"
import Inner from "../Inner/Inner"
import { getDatabase, ref,   onValue} from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { groupList } from './../../assets/Data/GroupList';

const GroupList = () => {

  const userInformation = useSelector( state => state.user.userInfo )
  const db = getDatabase();
  const [groupList, setGroupList] = useState([])

  useEffect(()=>{
    const groupList = ref(db, 'groups/' )
    const myGroupList = []
    onValue(groupList, (snapshot) => {
      snapshot.forEach(( item ) => {
        if( item.val().admin !== userInformation.email ) {
          myGroupList.push( item.val() )
        }
      } )
      setGroupList(myGroupList)
    } );
  })

  return (
    <Box name="Group List">
        {
            groupList.map((item, index)=>{
                return (
                    <Inner key={index} classNameImg="md:w-[50px] w-[45px]" src={item.groupPhoto} name={item.groupName} dec={item.groupDesc}>
                      <button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Join</button>
                    </Inner>
                )
            })
        }
    </Box>
  )
}

export default GroupList