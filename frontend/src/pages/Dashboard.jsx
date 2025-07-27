import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://final-hackhathone-faiza-ufwq.vercel.app/feedbacks', {
        headers: { Authorization: token },
      });
      setFeedbacks(res.data);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/welcome');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex flex-col items-center justify-start px-4 py-10"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg')" }}
    >
      <div className="self-end mb-4 w-full max-w-6xl flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 w-full max-w-6xl overflow-x-auto">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">📊 Student Feedback Dashboard</h2>
        <table className="w-full table-auto border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-200 text-blue-800">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Comments</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f, i) => (
              <tr key={i} className="hover:bg-blue-50 border-t">
                <td className="p-2 border text-gray-700">{f.name}</td>
                <td className="p-2 border text-gray-700">{f.email}</td>
                <td className="p-2 border text-gray-700">{f.course}</td>
                <td className="p-2 border text-gray-700">{f.rating}</td>
                <td className="p-2 border text-gray-700">{f.comments}</td>
                <td className="p-2 border text-gray-700">{new Date(f.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
