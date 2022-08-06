import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from "pusher-js";
import axios from './axios';

function App() {

  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync")
      .then(response => {
        // console.log(response.data);
        setMessages(response.data);
      })
  }, [])
  
  useEffect(() => {
    axios.get("/rooms/sync")
      .then(response => {
        setRooms(response.data);
      })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('a720097396eac554e3b0', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();

    };
    
  }, [messages]);

  return (
    <div className="app">
      <div className='app_body'>
      <Sidebar rooms={rooms} />
      <Chat messages={messages} />
      </div>
      
    </div>
  );
}

export default App;
