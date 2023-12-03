import { useSelector } from "react-redux"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { FaTelegramPlane } from "react-icons/fa";
import { BsEmojiLaughing } from "react-icons/bs";
import { MdOutlineInsertPhoto } from "react-icons/md";
import MsgSenderText from "../MsgSenderText/MsgSenderText";
import MsgReceiverText from "../MsgReceiverText/MsgReceiverText";
import { useEffect, useRef, useState } from "react";
import { getDatabase, onValue, ref, push } from "firebase/database";




const MessagesBox = () => {
  const db = getDatabase();
  const userInformation = useSelector( state => state.user.userInfo )
  const userMsgItem = useSelector( state => state.userMsg.userMsg )
  const [ message, setMessage ] = useState( "" )
  const [ msgList, setMsgList ] = useState( [] ); 
  const messageContainerRef = useRef( null );
  const [userScrolled, setUserScrolled] = useState(false);
  
  const scrollToBottom = () => {
    if (messageContainerRef.current && !userScrolled) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

    const handleScroll = () => {
    if (
      messageContainerRef.current.scrollTop + messageContainerRef.current.clientHeight <
      messageContainerRef.current.scrollHeight
    ) {
      setUserScrolled(true);
    } else {
      setUserScrolled(false);
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageContainerRef.current) {
        messageContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messageContainerRef]);
  
const handleMessageSend = () => {
  // send message to firebase
  const userRef = ref(db, 'friendRequests/');

  // Create a flag to track whether the message has been sent
  let messageSent = false;

  onValue(userRef, (snapshot) => {
    snapshot.forEach((user) => {
      if (
        user.val().senderId === userMsgItem.senderId &&
        user.val().receiverId === userMsgItem.receiverId &&
        !messageSent
      ) {
        // Set the flag to true to prevent further iterations
        messageSent = true;

        // Push the new message
        push(ref(db, `friendRequests/${user.key}/messages`), {
          senderId: userInformation.email,
          message: message,
        });
      }
    });
  });
  
  setMessage( "" );
  scrollToBottom();
  };
  
    const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  useEffect(() => {
    if (userMsgItem) {
      const userRef = ref(db, "friendRequests/");
      const messages = [];

      onValue(userRef, (snapshot) => {
        snapshot.forEach((item) => {
          if (
            item.val().receiverId === userMsgItem.receiverId &&
            item.val().senderId === userMsgItem.senderId &&
            item.val().status === "accept" &&
            item.val().messages
          ) {
            messages.push(item.val().messages);
          }
        });

        setMsgList(messages);

        // Scroll to the bottom after updating the messages
        scrollToBottom();
      });
    }
  }, [db, userMsgItem.receiverId, userMsgItem.senderId, msgList, userScrolled]);


  return (
    <div className="md:w-8/12 md:h-full overflow-hidden bg-white border rounded-[20px] px-[40px] py-[24px] drop-shadow-lg relative">

      <div className="h-1/10"><div className="flex items-center justify-between pr-4 py-3 last:pb-0 border-b-gray-300 border border-x-0 border-t-0 last:border-none" >
        <div className="flex items-center gap-x-[20px]">
            <div className="relative">
                <img src={ userMsgItem.senderPhotoURL === userInformation.photoURL ? userMsgItem.photoURL : userMsgItem.senderPhotoURL } className="rounded-full md:w-[70px] w-[50px]" />
                <div className="w-4 h-4 bg-green-500 rounded-full border-4 border-white absolute right-1 bottom-0"></div>
            </div>
            <div>
                <h3 className="md:text-xl sm:text-base text-sm font-bold">{userMsgItem.senderId === userInformation.email ? userMsgItem.receverName : userMsgItem.senderName }</h3>
                <p className="md:text-base sm-text-sm text-xs text-gray-500">{userMsgItem.senderId === userInformation.email ? userMsgItem.receiverId : userMsgItem.senderId}</p>
            </div>
        </div>
        <div>
            <BiDotsVerticalRounded className="md:text-2xl sm:text-xl text-lg text-primary"></BiDotsVerticalRounded> 
        </div>
      </div>
      </div>
      <hr className="h-px"/>
      <div ref={messageContainerRef} className="overflow-auto h-8/10 no-scrollbar py-2">
        
        { msgList[0] && Object.values(msgList[0]).map((item, index) => {
            return item.senderId === userInformation.email ? (
              <MsgSenderText key={index} msg={item.message} />
            ) : (
              <MsgReceiverText key={index} msg={item.message} />
            );
          })}
        
      </div>
      <hr className="h-px mb-4"/>
      <div className="h-1/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between border w-full mr-[23px] rounded-[10px] px-[23px] py-[10px] bg-[#F1F1F1] drop-shadow-lg mb-[20px]">
            <input value={message} onChange={( e ) => setMessage( e.target.value )} onKeyDown={handleKeyDown} type="text" className="outline-none focus:outline-none w-full py-[10px] bg-transparent"></input>
            <div className="flex items-center">
              
              <span className="text-2xl cursor-pointer pr-[20px]"><BsEmojiLaughing></BsEmojiLaughing></span>
              <span className="text-2xl cursor-pointer "><MdOutlineInsertPhoto></MdOutlineInsertPhoto></span>
            </div>
          </div>
          <div>
            <button  type="submit" onClick={handleMessageSend} className="text-white bg-primary text-3xl rounded-[10px] px-[23px] py-[20px] mb-[20px]"><FaTelegramPlane></FaTelegramPlane></button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MessagesBox