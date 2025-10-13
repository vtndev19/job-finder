import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/Chat.scss';
import chatIcon from '../assets/images/chatImg.png';
import { sendMessageToBot } from '../services/ChatService';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;

        const userMessage = { sender: 'user', text: inputValue };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        const currentInput = inputValue;
        setInputValue('');
        setIsLoading(true);

        const botResponseText = await sendMessageToBot(currentInput);

        const botResponse = { sender: 'bot', text: botResponseText };
        setMessages(prevMessages => [...prevMessages, botResponse]);
        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <button className="chat-toggle-button" onClick={toggleChat}>
                <img src={chatIcon} alt="Chat" />
            </button>

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Hỗ trợ trực tuyến</h3>
                        <button className="close-chat" onClick={toggleChat}>×</button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message bot loading">
                                <span></span><span></span><span></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input-area">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Nhập tin nhắn..."
                        />
                        <button onClick={handleSendMessage}>Gửi</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
