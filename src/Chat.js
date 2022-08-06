import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import "./Chat.css";
import axios from "./axios";

function Chat({ messages }) {
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            message: input,
            name: "DEMO APP",
            timestamp: "Demo ts",
            received: false
        })

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at ..</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map(message => (
                
                    
                <p className={`chat_message ${message.received && "chat_receiver"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                </p>

                
                    
                ))}
            </div>

            <div className="chat_footer">
                <InsertEmoticonOutlinedIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <KeyboardVoiceOutlinedIcon />
            </div>
        </div>
    );
}
export default Chat;