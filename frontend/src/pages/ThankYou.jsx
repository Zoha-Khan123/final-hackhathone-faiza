import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d')" }}>
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">🎉 Thank You!</h2>
        <p className="text-gray-800 text-lg mb-6">We appreciate your valuable feedback. It helps us improve and grow! 🙌</p>
        <button
          onClick={() => navigate('/admin/login')}
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition cursor-pointer"
        >
          Go to Admin Login
        </button>
      </div>
    </div>
  );
}
