import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Chat from './Components/Chat';

function App() {
  const socket = io.connect("http://localhost:3001")
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [msgList, setMsgList] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(name !== "" & room !== ""){
      socket.emit("join_room", room)
      setShowChat(true)
      
    }
  }

useEffect(() => {
  socket.on("send_msg",(val)=>{
    setMsgList(list=>[...list,val])
  })
}, [socket])
  

  return (
    <div className="App d-flex justify-content-center align-items-center my-5 ">
      {!showChat ? (
        <form className="row g-3">
          <div className="row-auto">
            <label htmlFor="name" className="visually-hidden">Username</label>
            <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" id="name" placeholder="username" />
          </div>
          <div className="row-auto">
            <label htmlFor="room" className="visually-hidden">Room</label>
            <input type="text" onChange={(e) => { setRoom(e.target.value) }} className="form-control" id="room" placeholder="room" />
          </div>
          <div className="col-auto">
            <button type="submit" onClick={handleSubmit} className="btn btn-primary mb-3">Submit</button>
          </div>
        </form>) : (
        <Chat   name={name} room={room} msgList={msgList} setMsgList={setMsgList} />
      )}

    </div>
  );
}

export default App;
