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
import CreateReport from './routes/reportRoutes/CreateReport';
import Reports from './routes/reportRoutes/Reports';
import InfoReport from './routes/reportRoutes/InfoReport';
import EditReport from './routes/reportRoutes/EditReport';
function App() {
  const [user, setUser] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
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

          <Route path="/report-create" element={<CreateReport />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/report-info" element={<InfoReport />} />
          <Route path="/report-edit" element={<EditReport />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
