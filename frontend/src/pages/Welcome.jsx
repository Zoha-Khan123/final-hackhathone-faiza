import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 text-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80')"}}
    >
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl max-w-lg w-full">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">🌟 Welcome!</h1>
        <p className="text-lg text-gray-700 mb-6">
          We're glad you're here. Ready to share your experience?
        </p>
        <button
          onClick={() => navigate('/feedback')}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Go to Feedback Form
        </button>
      </div>
    </div>
  );
}

