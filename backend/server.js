// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { db, admin } = require('./config/firebase');
// const { getAIReply } = require("./config/aiClient");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5173', 
// }));
// app.use(express.json());

// async function getAllMessages() {
//   const snapshot = await db
//     .collection('messages')
//     .orderBy('createdAt', 'asc')
//     .get();

//   const messages = [];
//   snapshot.forEach(doc => {
//     messages.push({ id: doc.id, ...doc.data() });
//   });
//   return messages;
// }


// // GET /api/history
// app.get('/api/history', async (req, res) => {
//   try {
//     const snapshot = await db
//       .collection('messages')
//       .get();

//     const messages = [];
//     snapshot.forEach(doc => {
//       messages.push({ id: doc.id, ...doc.data() });
//     });

//     res.json({ messages });
//   } catch (error) {
//     console.error('Error fetching history:', error);
//     res.status(500).json({ error: error.message || 'Failed to fetch history' });
//   }
// });



// // POST /api/chat
// app.post('/api/chat', async (req, res) => {
//   const { message } = req.body;

//   if (!message || !message.trim()) {
//     return res.status(400).json({ error: 'Message is required' });
//   }

//   try {
//     const batch = db.batch();
//     const messagesRef = db.collection('messages');

//     const userDocRef = messagesRef.doc();
//     batch.set(userDocRef, {
//       role: 'user',
//       text: message,
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     const aiReplyText = await getAIReply(message);

//     const aiDocRef = messagesRef.doc();
//     batch.set(aiDocRef, {
//       role: 'assistant',
//       text: aiReplyText,
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     await batch.commit();

//     const messages = await getAllMessages();
//     res.json({ messages });
//   } catch (error) {
//     console.error('Error handling chat:', error);
//     res.status(500).json({ error: 'Failed to process message' });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Backend server running on http://localhost:${PORT}`);
// });



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db, admin } = require('./config/firebase');
const { getAIReply } = require("./config/aiClient");

const app = express();
const PORT = process.env.PORT || 5000;

// 🌍 Fix CORS for production + local
app.use(cors());
app.use(express.json());

// 🏠 Root route (Render fix)
app.get("/", (req, res) => {
  res.send("AI Chat App Backend is running 🚀");
});

// Function to fetch all messages
async function getAllMessages() {
  const snapshot = await db
    .collection('messages')
    .orderBy('createdAt', 'asc')
    .get();

  const messages = [];
  snapshot.forEach(doc => {
    messages.push({ id: doc.id, ...doc.data() });
  });
  return messages;
}

// GET /api/history
app.get('/api/history', async (req, res) => {
  try {
    const snapshot = await db.collection('messages').get();

    const messages = [];
    snapshot.forEach(doc => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    res.json({ messages });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch history' });
  }
});

// POST /api/message  ← FIXED ROUTE
app.post('/api/message', async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const batch = db.batch();
    const messagesRef = db.collection('messages');

    // User message
    const userDocRef = messagesRef.doc();
    batch.set(userDocRef, {
      role: 'user',
      text: message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // AI reply
    const aiReplyText = await getAIReply(message);

    const aiDocRef = messagesRef.doc();
    batch.set(aiDocRef, {
      role: 'assistant',
      text: aiReplyText,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await batch.commit();

    const messages = await getAllMessages();
    res.json({ messages });
  } catch (error) {
    console.error('Error handling message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
