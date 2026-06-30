import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { io } from 'socket.io-client'
import { useRef } from 'react';

const App = () => {

  const [message, setMessage] = useState("")
  const [socketId, setSocketId] = useState("")
  const [room, setRoom] = useState("")
  const [recivedMsg, setRecivedMsg] = useState([])
  const [group, setGroup] = useState("")

  const socket = useMemo(() => io.connect("http://localhost:3000"), [])

  useEffect(() => {
   
    socket.on("connect", () => {
      setSocketId(socket.id)
      console.log("connected with socket !")
      socket.on("msg", (data) => {
        console.log(data)
        setRecivedMsg((prev) => (
          [
            ...prev,
            data
          ]
        ))
      })

      socket.on("s_msg", (data) => {
        console.log(data)
        setRecivedMsg((prev) => (
          [
            ...prev,
            data
          ]
        ))
      })

      socket.on("g_msg", (data) => {
        console.log(data)
        setRecivedMsg((prev) => (
          [
            ...prev,
            data
          ]
        ))
      })

    })
    return () => {
    socket.off("connect");
    socket.off("msg");
    socket.off("s_msg");
    socket.off("g_msg");
  };
  },[])


  useEffect(() => {
  if (group) {
    socket.emit("groupName", group);
  }
}, [group]);

  const handleSubmit = () => {
    if (room.length > 0) {
      socket.emit("s_msg", { room, message })
    }
    else if (group.length > 0) {
       socket.emit("g_msg",{group,message})
    }
    else {
      socket.emit("msg", message)
    }
    setMessage("")
  }

  return (
    <div className='p-3'>
      <h1 className='font-semibold text-lg'>Web Socket</h1>
      <h4>User Id : {socketId}</h4>
      <h4>Room Id : {room}</h4>
      <h4>Group Id : {group}</h4>
      <div>
        <input type="text" placeholder='Room Id' value={room} onChange={(e) => setRoom(e.target.value)} className='text-md py-2 px-3 mb-10 border border-neutral-300 rounded' />
        <button onClick={() => setRoom(room)} className='ml-3  bg-blue-500 py-2 px-4 text-white rounded '>Set Room</button>
      </div>

      <div>
        <input type="text" placeholder='Group Id' value={group} onChange={(e) => setGroup(e.target.value)} className='text-md py-2 px-3 mb-10 border border-neutral-300 rounded' />
        <button onClick={() => setGroup(group)} className='ml-3  bg-blue-500 py-2 px-4 text-white rounded '>Set Group</button>
      </div>

      <div className='m-2'>

        <div className="m-2">
          {recivedMsg.map((msg, index) => (
            <div key={index} className="mb-4 mt-4">
              <p className="bg-green-400 py-1 px-2 rounded inline">{msg}</p>
            </div>
          ))}
        </div>


      </div>
      <div className='absolute bottom-0 w-11/12'>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='message' className='w-8/12 text-md py-2 px-3 mb-10 border border-neutral-300 rounded' />
        <button onClick={() => handleSubmit()} className='ml-3  bg-blue-500 py-2 px-4 text-white rounded '>Send</button>
      </div>
    </div>
  )
}

export default App
