import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../lib/firebase'; // Ensure Firebase is configured here
import socket from '../lib/socket';
import Message from './Message';

function ChatRoom({ chatId, userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.emit("joinChat", chatId);

    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("chatId", "==", chatId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(loadedMessages);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      unsubscribe();
      socket.off("receiveMessage");
    };
  }, [chatId]);

  const sendMessage = async () => {
    const message = {
      chatId,
      userId,
      text: newMessage,
      timestamp: new Date().toISOString()
    };
    await addDoc(collection(db, "messages"), message);
    socket.emit("sendMessage", message);
    setNewMessage("");
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} />
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;
