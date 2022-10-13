import React, { useState, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import './App.scss';
import CreateConference from './routes/CreateConference';
import InfoConference from './routes/InfoConference';
import EditConference from './routes/EditConference';
import { AuthContext } from './hooks/useAuth';
function App() {
  const [user, setUser] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <div className="App">
      <AuthContext.Provider value={providerUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreateConference />} />
          <Route path="/info" element={<InfoConference />} />
          <Route path="/edit" element={<EditConference />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
