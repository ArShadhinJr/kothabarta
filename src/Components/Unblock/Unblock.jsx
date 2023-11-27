import Box from "../Box/Box";
import Inner from "../Inner/Inner";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { get, getDatabase, onValue, ref, update } from "firebase/database";

const Unblock = () => {
  const db = getDatabase();
  const [blockDataList, setBlockDataList] = useState([]);
  const userInformation = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const userRef = ref(db, 'friendRequests/');

    const fetchData = () => {
      onValue(userRef, (snapshot) => {
        const blockData = [];
        snapshot.forEach((block) => {
          if ((block.val().status === "blocked") && (block.val().blockedBy === userInformation.email)) {
            blockData.push(block.val());
          }
        });
        setBlockDataList(blockData);
      });
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, userInformation, blockDataList]); // Include only the dependencies needed for the effect

const handleUnblock = async (item) => {
  const userRef = ref(db, 'friendRequests/');

  try {
    const snapshot = await get(userRef);

    const updatePromises = [];

    snapshot.forEach((user) => {
      if ((user.val().status === "blocked") && (user.val().blockedBy === userInformation.email) && (user.val().blockedId === item.receiverId || user.val().blockedId === item.senderId)) {
        updatePromises.push(update(ref(db, 'friendRequests/' + user.key), {
          status: "accept",
          blockedBy: null,
          blockedId: null
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
    <Box name="Block Users">
      {blockDataList.map((item, index) => (
        <Inner key={index} src={item.photoURL} name={item.receverName} dec={item.receiverId}>
          <button onClick={() => handleUnblock(item)} className="bg-primary text-white px-5 py-1 rounded-lg active:scale-95">Unblock</button>
        </Inner>
      ))}
    </Box>
  );
};

export default Unblock;
