import React from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import Community from './pages/Community';
import UserProfile from './pages/UserProfile';
import UserList from './pages/UsersList';
import NewUser from './pages/NewUser';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate replace to='/users' />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/users/:userId' element={<UserProfile />} />
          <Route path='/new-user' element={<NewUser />} />
          <Route path='/community' element={<Community />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
