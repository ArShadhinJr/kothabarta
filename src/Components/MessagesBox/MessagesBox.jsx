import { useSelector } from "react-redux"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { FaTelegramPlane } from "react-icons/fa";
import { BsEmojiLaughing } from "react-icons/bs";
import { MdOutlineInsertPhoto } from "react-icons/md";
// import { useState } from "react";
import MsgSenderText from "../MsgSenderText/MsgSenderText";
import MsgReceiverText from "../MsgReceiverText/MsgReceiverText";
import MsgReceiverImg from "../MsgReceiverImg/MsgReceiverImg";
import MsgSenderImg from "../MsgSenderImg/MsgSenderImg";



const MessagesBox = () => {
  const userInformation = useSelector( state => state.user.userInfo )
  const userMsgItem = useSelector( state => state.userMsg.userMsg )
  
  const handleMessageSend =( ) => {
    // send message to firebase
    

  }

  return (
    <div className="md:w-8/12 md:h-full overflow-hidden bg-white border rounded-[20px] px-[40px] py-[24px] drop-shadow-lg">

      <div className="h-1/10"><div className="flex items-center justify-between pr-4 py-3 last:pb-0 border-b-gray-300 border border-x-0 border-t-0 last:border-none" >
        <div className="flex items-center gap-x-[20px]">
            <div className="relative">
                <img src={ userMsgItem.photoURL } className="rounded-full md:w-[70px] w-[50px]" />
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
      <div className="overflow-auto h-8/10 no-scrollbar py-2 ">
        <MsgReceiverText msg="Assalamu Alaikum"/>  
        <MsgSenderText msg="Walaikum Assalam"/>
        <MsgReceiverText msg="Kemon achen?"/>
        <MsgSenderText msg="Allah valo rekechen Alhamdulillah." />
        <MsgReceiverImg />
        <MsgSenderImg/>
        
      </div>
      <hr className="h-px mb-4"/>
      <div className="h-1/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between border w-full mr-[23px] rounded-[10px] px-[23px] py-[10px] bg-[#F1F1F1] drop-shadow-lg mb-[20px]">
            <input type="text" className="outline-none focus:outline-none w-full py-[10px] bg-transparent"></input>
            <div className="flex items-center">
              
              <span className="text-2xl cursor-pointer pr-[20px]"><BsEmojiLaughing></BsEmojiLaughing></span>
              <span className="text-2xl cursor-pointer "><MdOutlineInsertPhoto></MdOutlineInsertPhoto></span>
            </div>
          </div>
          <div>
            <button type="submit" onClick={ ()=>handleMessageSend()} className="text-white bg-primary text-3xl rounded-[10px] px-[23px] py-[20px] mb-[20px]"><FaTelegramPlane></FaTelegramPlane></button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MessagesBox