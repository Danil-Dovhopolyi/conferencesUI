import React, { useState, useMemo, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Auth/Login';
import Register from './routes/Auth/Register';
import './App.scss';
import CreateConference from './routes/CreateConference';
import InfoConference from './routes/InfoConference';
import EditConference from './routes/EditConference';
import { AuthContext } from './hooks/useAuth';
import { PrivateRouteCreate } from './routes/PrivateRoute/PrivateRouteCreate';
import { PrivateRouteEdit } from './routes/PrivateRoute/PrivateRouteEdit';
import { PrivateRouteInfo } from './routes/PrivateRoute/PrivateRouteInfo';
import { PrivateRouteAuth } from './routes/PrivateRoute/PrivateRouteAuth';
import CreateReport from './routes/reportRoutes/CreateReport';
import Reports from './routes/reportRoutes/Reports';
import InfoReport from './routes/reportRoutes/InfoReport';
import EditReport from './routes/reportRoutes/EditReport';
import ProfileEdit from './routes/Auth/ProfileEdit';
import Favourite from './routes/FavouriteReports/Favourite';
function App() {
  const [user, setUser] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <AuthContext.Provider value={providerUser}>
        <Routes>
          <Route element={<PrivateRouteAuth />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />

          <Route element={<PrivateRouteInfo />}>
            <Route path="/info" element={<InfoConference />} />
          </Route>

          <Route element={<PrivateRouteEdit />}>
            <Route path="/edit" element={<EditConference />} />
          </Route>

          <Route element={<PrivateRouteCreate />}>
            <Route path="/create" element={<CreateConference />} />
          </Route>
          <Route path="/profile" element={<ProfileEdit />} />
          <Route path="/report-create" element={<CreateReport />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/report-info" element={<InfoReport />} />
          <Route path="/report-edit" element={<EditReport />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
