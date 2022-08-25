import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://fitplus-backend.vercel.app',
  withCredentials: true, // เพื่อให้ส่ง cookie ได้
});