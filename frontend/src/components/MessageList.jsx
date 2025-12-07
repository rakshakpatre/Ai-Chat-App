import React from 'react';

const formatTime = (createdAt) => {
  try {
    if (!createdAt) return '';

    // Firestore timestamp object: {_seconds, _nanoseconds}
    if (createdAt._seconds) {
      const d = new Date(createdAt._seconds * 1000);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Fallback if we ever store a JS Date / ISO string
    const d = new Date(createdAt);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
};

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg) => {
        const isUser = msg.role === 'user';
        const time = formatTime(msg.createdAt);

        return (
          <div
            key={msg.id}
            className={`message-row ${isUser ? 'message-user' : 'message-ai'}`}
          >
            {!isUser && (
              <div className="avatar avatar-ai">
                <span>AI</span>
              </div>
            )}

            <div className="message-bubble-wrapper">
              <div className="message-bubble">
                <div className="message-meta">
                  <span className="message-author">
                    {isUser ? 'You' : 'AI Assistant'}
                  </span>
                  {time && <span className="message-time">{time}</span>}
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            </div>

            {isUser && (
              <div className="avatar avatar-user">
                <span>U</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
