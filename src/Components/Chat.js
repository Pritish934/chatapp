import React, { useState } from 'react'
import { io } from 'socket.io-client'; 

const  socket = io.connect('http://localhost:3001')

const Chat = ({ name, room, msgList, setMsgList}) => {
    const [message, setMessage] = useState("")
    
    const handleSend = async () => {
        
        const msgData = {
            room: room,
            name: name,
            msg: message
        }
        if (message !== "") {
            setMessage("")
            await socket.emit("recive_msg",msgData)
            socket.connect()
        }
    }
 
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    return (
        <div className='w-100'>
            {msgList.map((val) => {
                return <div  className={`d-flex ${name === val.name ? "justify-content-end":"justify-content-start"}`}>
                    <div className='d-flex justify-content-center align-items-center p-2 bg-primary rounded-5 my-2 '>{val.msg}</div>
                </div>
            })}
            <div className="position-fixed end-0 bottom-0 my-3 input-group">
                <input type="text" className="form-control" value={message} onChange={handleChange}/>
                    <button onClick={handleSend} className='btn btn-primary'>send</button>
            </div>
        </div>
    )
}

export default Chat