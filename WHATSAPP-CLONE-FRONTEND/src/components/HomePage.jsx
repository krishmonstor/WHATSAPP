import React, { useState } from 'react'
import {TbCircleDashed}  from 'react-icons/tb'
import {BiCommentDetail} from 'react-icons/bi'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical} from "react-icons/bs"
import {ImAttachment} from "react-icons/im"
import ChatCard from './ChatCard/ChatCard'
import { Button, Menu, MenuItem } from '@mui/material';
import MessageCard from './MessageCard/MessageCard'
import './Status/css/HomePage.css'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile/Profile'
import CreateGroup from './Group/CreateGroup'
  const HomePage = () => {
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const[querys,setQuerys] = useState(null);
    const [currentChat,setCurrentChat] = useState(null)
    const [content,setContent] = useState("")
    const [isProfile,setIsProfile] = useState(false)
    const navigate = useNavigate();
    const [isGroup,setIsGroup] = useState(false)
    const handleSearch = () =>{};
    const handleClickOnChatCard = () =>{
      setCurrentChat(true)
    }
    const handleCreateNewMessage = () =>{
    }
    const handleNavigate = () =>{
      // navigate("/profile")
      setIsProfile(true)
    }
    const handleCloseOpenProfile = () =>{
      setIsProfile(false)
    }

    const handleCreateGroup = () =>{
      setIsGroup(true)
    }
    const handleReverse = () =>{
      navigate(-1)
    }
  return (
  <div className='relative'>
  <div className='w-full py-14 bg-[#00a884]'>
    <div className='flex bg-[#f0f2f5] h-[90vh] absolute left-[2vw] w-[96vw] top-[vh]   '>
        <div className='left w-[30%] bg-[#e8e9ec] h-full'>
          {isGroup && <CreateGroup handleReverse={handleReverse}/>}
          {isProfile && <div className='w-full h-full'><Profile handleCloseOpenProfile={handleCloseOpenProfile}/></div>}
            { !isProfile && !isGroup && <div className='w-full '>
              {/* profile page */}
              
              {/* home page */}
              {!isProfile &&  <div className='flex justify-between items-center px-5 py-3'>
                    <div onClick={handleNavigate} className='flex items-center space-x-3'>
                        <img className='rounded-full w-10 h-10 cursor-pointer' 
                        src="https://cdn.pixabay.com/photo/2023/09/04/07/42/ai-generated-8232213_1280.png"
                        alt="image not found"/>
                        <p>username</p>
                    </div>
                    <div className='space-x-3 text-2xl flex'>
                        <TbCircleDashed className='cursor-pointer' onClick={()=>navigate("/status")}/>
                        <BiCommentDetail/>
                        <div>
                        
       <BsThreeDotsVertical id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}/>
                        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
                        </div>
                        
                    </div>
                </div>}
                <div className='relative flex justify-center items-center bg-white py-4 px-3'>
                    <input className='border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2'
                    type="text" 
                    placeholder='Search for start new chat'
                    onChange={(e)=>{
                      setQuerys(e.target.value)
                      handleSearch(e.target.value)
                    }}
                    value={querys}
                    />
                    <AiOutlineSearch className='left-7 top-7 absolute'/>
                    <div>
                        <BsFilter className='ml-4 text-3xl'/>
                    </div>
                </div>
                {/* all userts */}
                <div className='bg-white overflow-y-scroll h-[72vh] px-6'>
                  
                {querys && [1,1,1,1].map((item) => 
                <div onClick={handleClickOnChatCard}> {""}
                  <hr/> <ChatCard/>{""}</div>)}
                  </div>
            </div>}
            <div>
              {/* default whats up page  */}
            </div>
        </div>
    
      { !currentChat && <div className='  w-[70%] h-full flex flex-col items-center justify-center  '>
        <div className='max-w-full text-center'>
          <img src="https://cdn.pixabay.com/photo/2017/01/12/21/42/tiger-1975790_1280.jpg" alt="default home page not found" />
          <h1 className='text-4xl  text-gray-600'>WhatsApp Web</h1>
          <p className='my-9'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem quos qui repellat voluptas enim eius!</p>
        </div>

      </div>}
      {/* message part */}
    { currentChat && <div className='w-[70%] relative'>
      <div className='header absolute top-0 w-full bg-[#f0f2f5]'>
        <div className='flex justify-between'>
          <div className='py-3 space-x-4 flex items-center px-3'>
            <img className='w-10 h-10 rounded-full' src="data:image/jpeg;base64,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" alt="not found" />
            <p>username</p>
          </div>
          <div className='py-3 flex space-x-4 items-center px-3'>
            <AiOutlineSearch/>
            <BsThreeDotsVertical/>
          </div>
        </div>
      </div>
        {/* message section */}

      <div className='px-8 py-10 h-[85vh] overflow-y-scroll bg-blue-200'>
        <div className='space-y-1 flex flex-col justify-center mt-2  px-10 py-10'>
          {[1,1,1,1,1].map((item,i) =><MessageCard isReqUserMessage={i%2==0} content={"message"}/>)}
        </div>
      </div>

      {/* footer part */}
      <div className='footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl'>
        <div className='flex justify-between items-center px-5 relative'>
        
          <BsEmojiSmile className='cursor-pointer'/>
          <ImAttachment/>
        <input className='py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]'
         type='text' 
         onChange={(e) => setContent(e.target.value)}
         placeholder='Type message'
         value={content}
         onKeyPress={(e) =>{
          if(e.key == "Enter"){
            handleCreateNewMessage();
            setContent("")
          }
         }}
         />
         <BsMicFill />
         </div>
      </div>
      </div>}
  </div>
</div>
  </div>
  )
  }

  export default HomePage;
