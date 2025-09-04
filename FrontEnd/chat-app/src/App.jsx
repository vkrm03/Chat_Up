import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Chat from './ChatPage';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/join-room" element={<JoinRoom />} />
          <Route path="/chat/create-room" element={<CreateRoom />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ConditionalFooter />
      </div>
    </Router>
  );
}

const ConditionalFooter = () => {
  const location = useLocation();
  const showFooter = location.pathname !== '/chat';
  return showFooter ? <Footer /> : null;
};

export default App;
