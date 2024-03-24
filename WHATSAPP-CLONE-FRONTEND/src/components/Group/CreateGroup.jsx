import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import SelectedMember from './SelectedMember'
import { useNavigate } from 'react-router-dom'
import ChatCard from '../ChatCard/ChatCard'
import NewGroup from './NewGroup'

const CreateGroup = ({handleReverse}) => {
    const [newGroup,setNewGroup] = useState(false)
    const [query,setQuery] = useState("")
    // const navigate = useNavigate();
    const [groupMember,setGroupMember] = useState(new Set())
    const handleRemoveMember = (item) =>{
        const updatedGroupMember = new Set([...groupMember].filter(member => member !== item));        updatedGroupMember.delete(item)
        setGroupMember(updatedGroupMember);
    }
    const handleSearch = () =>
    {

    }

  return (
    <div className='w-full h-full'>
        {!newGroup &&(
        <div>
            <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
                <BsArrowLeft 
                className='cursor-pointer test-2xl font-bold'
                onClick={handleReverse}
                />
                <p className='text-xl font-semibold'>Add Group Participats</p>
            </div>
            <div className='relative bg-white py-4 px-3'>
                <div className='flex space-x-2 flex-wrap space-y-1'>
                    {groupMember.size > 0 && Array.from(groupMember).map((item) => (
                    <SelectedMember handleRemoveMember={() => handleRemoveMember(item)}
                    member={item}/>))}
                </div>
                <input type="text" 
                className='outline-none border-b border-[#8888] p-2 w-[93%]'
                placeholder='Search user'
                value={query}
                onChange={(e)=>{
                    handleSearch(e.target.value)
                    setQuery(e.target.value)
                }}/>
            </div>
            <div className='bg-white overflow-scroll h-[50.2vh'>
                {query && [1,2,3,4,5].map((item) =><div onClick={() =>{
                    groupMember.add(item)
                    setGroupMember(groupMember)
                    setQuery("")
                }}
                key={item} // change to key={item?.id}
                >
                    <hr/>
                    <ChatCard />
                </div>
                    
                )}
            </div>
            <div className='bottom-10 py-10 bg-slate-200 flex items-center justify-center'>
                <div className='bg-green-600 rounded-full p-4 cursor-pointer' 
                onClick={()=>{
                        setNewGroup(true)
                    }}>
                    <BsArrowRight
                    className='text-white font-bold text-3xl'
                    ></BsArrowRight>
                </div>

            </div>
        </div>
        )}
        {newGroup && <NewGroup/>

        }
    </div>
  )
}

export default CreateGroup
