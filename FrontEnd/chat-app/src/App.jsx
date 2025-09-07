import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavBar from './NavBar';
import Home from './Home';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Chat from './ChatPage';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import ChatRoom from './ChatRoom';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/join-room" element={<JoinRoom />} />
          <Route path="/chat/create-room" element={<CreateRoom />} />
          <Route path="/chat/chat-room" element={<ChatRoom />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ConditionalFooter />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Router>
  );
}

const ConditionalFooter = () => {
  const location = useLocation();
  const showFooter = location.pathname !== '/chat' && location.pathname !== '/chat/chat-room';
  return showFooter ? <Footer /> : null;
};

export default App;
