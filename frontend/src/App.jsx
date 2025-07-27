import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FeedbackForm from './pages/FeedbackForm';
import ThankYou from './pages/ThankYou';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;