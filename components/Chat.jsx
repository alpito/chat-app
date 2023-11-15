import { useEffect, useState } from "react";
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from "firebase/firestore";
import {auth, db} from "../firebase-config";



export const Chat = (props) => {

    const {room} = props;

    const [newMessage, setNewMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");

        useEffect(() => {
            const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
            const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
                let messages = [];
                snapshot.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id});
                });
                
                setMessages(messages);
            });

            return () => unsuscribe();
        }, []);
    


    const handleSumbit = async (e) =>{
        e.preventDefault();
        if (newMessage === "") return;
        
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            
            room: room,

            
        });

        setNewMessage("");

    }



    return (
        <div className="chat-app">
            <div className="header"> <h1>The room you're at is {room.toUpperCase()}</h1></div>
            <div className="messages">
                {messages.map ((message) => (
                    <div className="message" key={message.id}>
                        
                        <span className="user"> {message.user}: </span>
                        <span className="text"> {message.text} </span>
                    </div>





                ))}
                    

                  
            </div>
            <form onSubmit={handleSumbit}>

            <input type="text" placeholder="Type your message" 
            onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
            <button type="submit"> Send </button>

            </form>
        </div>
    )
}