/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

export default function TaskCount({total, complete}) {
  return (
    <div className='flex mb-4 justify-around items-center gap-4 border-2 p-2 rounded-xl'>
        <span className='w-1/3 h-full'>
        <p className='m-2 text-3xl font-bold'>Tasks Done : </p>
        <p className='text-1xl m-2'>{complete>(total/2) ? (complete==total? "Bravo! All done":"Keep it up: Majority tasks done") : total==0?"Add tasks" : "You can do it: A lot is still left"}</p>
        </span>
        <span className="bg-green-600 w-[10rem] h-[10rem] rounded-full flex justify-center items-center text-3xl font-bold my-2">
            {complete}/{total}
        </span>
    </div>
  )
}

