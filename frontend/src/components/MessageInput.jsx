import React, { useState } from 'react';

const MessageInput = ({ onSend, loading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="message-input"
        placeholder="Type your message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="send-button"
        disabled={loading || !value.trim()}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default MessageInput;
