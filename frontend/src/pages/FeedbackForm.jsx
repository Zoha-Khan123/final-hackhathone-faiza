import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: '', email: '', course: '', rating: '', comments: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post('http://localhost:5000/feedback', form);
      navigate('/thankyou');
    } catch (error) {
      alert('Submission failed: ' + (error.response?.data?.message || error.message));
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b')" }}>
      <div className="backdrop-blur-sm bg-white/70 min-h-screen flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-center text-blue-700">Student Feedback Form</h2>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Course"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.course}
            onChange={e => setForm({ ...form, course: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Rating (1 to 100)"
            min="1"
            max="100"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.rating}
            onChange={e => setForm({ ...form, rating: e.target.value })}
            required
          />
          <textarea
            placeholder="Comments"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            value={form.comments}
            onChange={e => setForm({ ...form, comments: e.target.value })}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
