import React from 'react'
import {Auth} from './components/Auth';
import {useState, useRef} from "react"
import "./App.css"
import {Chat} from './components/Chat';
import {auth} from "./firebase-config";
import { signOut } from "firebase/auth";


import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const handleSignOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  }



  if (!isAuth){
  return (
    <div>

        <Auth setIsAuth={setIsAuth} />
    </div>
  )
}

return (
  <div>
    {room ? (
      <Chat room={room} />
    ) : (
      <div className="room-section">
        <label htmlFor="roomInput" className="room-label">
          Enter Room Number
        </label>
        <input
          type="text"
          ref={roomInputRef}
          id="roomInput"
          className="room-input"
        />
        <button
          onClick={() => setRoom(roomInputRef.current.value)}
          className="enter-chat-button"
        >
          Enter Chat
        </button>
      </div>
    )}

    <div>
      <button onClick={handleSignOut} className="sign-out-button">
        Sign Out
      </button>
    </div>
  </div>
);

}



export default App
