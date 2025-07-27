import mongoose from 'mongoose';
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  rating: Number,
  comments: String,
  createdAt: Date,
});
export default mongoose.model('Feedback', feedbackSchema);

