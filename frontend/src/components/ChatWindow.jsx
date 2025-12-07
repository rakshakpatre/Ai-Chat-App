import React, { useEffect, useRef, useState } from 'react';
import MessageList from './MessageList.jsx';
import MessageInput from './MessageInput.jsx';
import { fetchHistory, sendMessage } from '../services/api.js';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoadingMessages(true);
        const history = await fetchHistory();
        setMessages(history);
      } catch (err) {
        console.error(err);
        setError('Failed to load chat history.');
      } finally {
        setLoadingMessages(false);
      }
    };

    loadHistory();
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  const handleSend = async (messageText) => {
    try {
      setSending(true);
      setError('');

      const tempId = `temp-${Date.now()}`;
      const tempUserMessage = {
        id: tempId,
        role: 'user',
        text: messageText,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, tempUserMessage]);

      const updatedMessages = await sendMessage(messageText);
      setMessages(updatedMessages);
    } catch (err) {
      console.error(err);
      setError('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div>
          <h1>AI Chat App</h1>
          <p className="chat-subtitle">
            Chat with an AI assistant powered by Gemini
          </p>
        </div>

        <div className="chat-status">
          <span className="status-dot" />
          <span className="status-text">Backend connected</span>
        </div>
      </div>

      <div className="chat-body">
        {loadingMessages ? (
          <div className="status status-loading">
            <div className="spinner" />
            <span>Loading your previous conversation...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="status status-empty">
            <h3>Start a new conversation</h3>
            <p>
              Your messages and AI responses will appear here and are stored
              securely in Firestore.
            </p>
          </div>
        ) : (
          <>
            <MessageList messages={messages} />
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}

      <MessageInput onSend={handleSend} loading={sending} />
    </div>
  );
};

export default ChatWindow;
