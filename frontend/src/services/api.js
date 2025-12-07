import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL|| 'http://localhost:5000/api';

export async function fetchHistory() {
  const res = await axios.get(`${API_BASE_URL}/history`);
  return res.data.messages;
}

export async function sendMessage(message) {
  const res = await axios.post(`${API_BASE_URL}/chat`, { message });
  return res.data.messages;
}


// import axios from 'axios';

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// export async function fetchHistory() {
//   const res = await axios.get(`${API_BASE_URL}/history`);
//   return res.data.messages;
// }

// export async function sendMessage(message) {
//   const res = await axios.post(`${API_BASE_URL}/message`, { message });
//   return res.data.messages;
// }
