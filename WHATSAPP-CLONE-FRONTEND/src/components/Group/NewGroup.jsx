import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs'

const NewGroup = () => {
    const [isImageLoading,setIsImageLoading] = useState(false)
    const [groupName,setGroupName] = useState();
  return (
    <div className='w-full h-full'>
        <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
            <BsArrowLeft/>
            <p className='text-xl font-semibold'>New Group</p>
        </div>
        <div className='flex flex-col justify-center items-center my-12 '>
            <label htmlFor="imgInput" className='relative'>
                <img className='bottom-11 rounded-full h-10px '
                  src="https://images.pexels.com/photos/3336447/pexels-photo-3336447.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
            {isImageLoading && <CircularProgress className='absolute top-[5rem] left-[6rem]'/>}
            </label>
            <input type="file"
            id='imgInput'
            className='hidden'
            onChange={() => console.log("imageonChange")}
            />
        </div>
        <div className='w-full flex justify-between items-center py-2 px-5'>
            <input className='w-full outline-none border-b-2 border-green-700 px-2 bg-transparent' 
            value = {groupName}
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
            />
        </div>
      { groupName &&   <div className='py-10 bg-slate-200 flex items-center justify-center'>
        <Button>
          <div className='bg-[#0c977d] rounded-full p-4'> 
            <BsCheck2 className='text-white font-bold text-3xl'/>
          </div>
        </Button>
        </div>}
    </div>
  )
}

export default NewGroup
