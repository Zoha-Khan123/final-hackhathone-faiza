//  =======Modules Import============
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { comparePassword } from './utils/hashPassword.js';
import bcrypt from 'bcrypt';

import Feedback from './models/Feedback.js';
import Admin from './admins/Admin.js';

// ========Express App Setup===========
dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://final-hackhathone-faiza-ufwq.vercel.app"
  ]
}));

app.use(express.json());


// =========JWT Middleware (Protects Routes)================
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// ===========Feedback Submit Route=================
app.post('/feedback', async (req, res) => {
  const { name, email, course, rating, comments } = req.body;
  try {
    const feedback = new Feedback({ name, email, course, rating, comments, createdAt: new Date() });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving feedback' });
  }
});
// ========Get All Feedbacks (Admin Protected)============
app.get('/feedbacks', authMiddleware, async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
});

// =================Admin Create Route (Register)============
app.post('/admin/create', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const admin = new Admin({ email, password: hashed });
  await admin.save();
  res.json({ message: 'Admin created' });
});

// ==================Admin Login Route=======================
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Email from client:', email);
  console.log('Password from client:', password);

  const admin = await Admin.findOne({ email });
  console.log('Admin found:', admin); // 👈 Check if this is null or has correct data

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials (email not found)' });
  }

  console.log('Stored hashed password:', admin.password);

  const isMatch = await comparePassword(password, admin.password); 
  console.log('Password match result:', isMatch); // 👈 true or false?

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials (password mismatch)' });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY);
  return res.status(200).json({ message: "Login successful", token });
});


// =============== All users =============
app.get("/admin/all-users", async (req, res) => {
  try {
    const users = await Admin.find();
    console.log(users);
    res.status(200).json({ message: users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// =================== MongoDB Connection==================
const db = process.env.MONGODB_URL;
const connection = mongoose.connect(db)
.then(() => {
    console.log('MongoDB connected');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });


// ================== Start Server==================
const port = process.env.PORT || 5000;
app.listen(port, ()=> { 
  console.log(`Server is running on port ${port}`);
})

