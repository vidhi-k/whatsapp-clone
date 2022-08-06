import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarChat.css";

function SidebarChat({ rooms }) {

    // console.log(rooms)

    return (
        <div >

            {rooms.map((room) => (
                <div className="sidebarChat">
                    <Avatar />

                    <div className="sidebarChat_info">
                        {/* {console.log(room.name)} */}
                        <h2>{room.name}</h2>
                        <p>The last message</p>
                    </div>
                </div>
            ))}

        </div>
    );

}

export default SidebarChat;