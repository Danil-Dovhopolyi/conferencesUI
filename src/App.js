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
import { PrivateRouteInfoAndCreate } from './routes/PrivateRoute/PrivateRouteInfoAndCreate';
import { PrivateRouteEdit } from './routes/PrivateRoute/PrivateRouteEdit';
import { Sanctum } from 'react-sanctum';
import CreateReport from './routes/reportRoutes/CreateReport';
import Reports from './routes/reportRoutes/Reports';
function App() {
  const [user, setUser] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const sanctumConfig = {
    apiUrl: 'http://127.0.0.1:8000',
    csrfCookieRoute: 'csrf-cookie',
    signInRoute: 'login',
    signOutRoute: 'logout',
    userObjectRoute: 'api/user',
  };
  return (
    <div className="App">
      <Sanctum config={sanctumConfig}>
        <AuthContext.Provider value={providerUser}>
          <Routes>
            {/* login */}
            <Route element={<PrivateRouteEdit />}>
              <Route path="/info" element={<InfoConference />} />
            </Route>
            {/* login */}

            {/* 403 */}
            <Route element={<PrivateRouteInfoAndCreate />}>
              <Route path="/create" element={<CreateConference />} />
              <Route path="/edit" element={<EditConference />} />
            </Route>
            {/* 403 */}

            <Route path="/create-report" element={<CreateReport />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </AuthContext.Provider>
      </Sanctum>
    </div>
  );
}

export default App;
