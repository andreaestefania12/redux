import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Components
import DashboardPage from './pages/DashboardPage';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import { Navbar } from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<DashboardPage/>} />
        <Route path="/posts" element={<PostsPage/>} />
        <Route path="/posts/:id" element={<PostPage/>} />
      </Routes>
    </Router>
  )
}

export default App