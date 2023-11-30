import Box from "../Box/Box"
// import { myGroupData } from "../../assets/Data/MyGroupData"
import Inner from "../Inner/Inner"
import { useSelector } from "react-redux"
import { getDatabase, ref, push, onValue } from "firebase/database";
import { useEffect, useState } from "react"


const MyGroup = () => {

  const userInformation = useSelector( state => state.user.userInfo )
  const db = getDatabase();
  const [ myGroupData, setMyGroupData ] = useState( [] )
  const [ groupCreateFiled , setGroupCreateFiled ] = useState( false )
  const [ groupValues , setGroupValues ] = useState( {
    groupName : "",
    groupDesc : ""
  })

  // read data from firebase database for group collection which is created by me
  useEffect(()=>{
    const myGroupData = ref(db, 'groups/' )
    const myGroupList = []
    onValue(myGroupData, (snapshot) => {
      snapshot.forEach(( item ) => {
        if( item.val().admin === userInformation.email ) {
          myGroupList.push( item.val() )
        }
      } )
      setMyGroupData(myGroupList)
    } );
  })
  
  // sent data to firebase database for group creation 
    const handleCreateGroup = (e) => {
      e.preventDefault();
      setGroupCreateFiled( !groupCreateFiled )
      setGroupValues({
        groupName: "",
        groupDesc: ""
      });
      console.log(groupValues);

      const groupRef = ref(db, "groups");
      const newGroup = {
        groupName: groupValues.groupName,
        groupDesc: groupValues.groupDesc,
        admin: userInformation.email,
        groupPhoto: userInformation.photoURL,
        members : [
          {
            uid: userInformation.uid,
            name: userInformation.displayName,
            email: userInformation.email,
            photoURL: userInformation.photoURL
          }
        ]
      };

      push(groupRef, newGroup)
        .then(() => {
          console.log("Group created successfully");
        })
        .catch((error) => {
          console.error("Error creating group:", error);
        });
    };

  return (
    <Box name="My Group" button={<button onClick={() => setGroupCreateFiled( !groupCreateFiled )} className="border border-primary text-primary px-5 py-1 rounded-lg active:scale-95">{groupCreateFiled ? "Close" : "Create Group"}</button>}>
        {
        groupCreateFiled ? 
          <form action="">
              <input value={groupValues.groupName} onChange={ ( e ) => setGroupValues( { ...groupValues, groupName : e.target.value } ) } type="text" placeholder="Enter Group Name" className="border mt-2 outline-none border-gray-300 rounded-lg px-3 py-2 w-full" /> 
              <input value={groupValues.groupDesc} onChange={ ( e ) => setGroupValues( { ...groupValues, groupDesc : e.target.value } ) } type="text" placeholder="Enter Group Description" className="border mt-2 outline-none border-gray-300 rounded-lg px-3 py-2 w-full" />
              <button type="submit" onClick={handleCreateGroup}  className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95 mt-2">Create</button>
          </form>
        : 
          
            myGroupData.map((item, index)=>{
                return (
                    <Inner key={index} src={item.groupPhoto} name={item.groupName} dec={item.groupDesc}>
                      <button className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Veiw</button>
                    </Inner>
                )
            })
        
        }
    </Box>
  )
}

export default MyGroup