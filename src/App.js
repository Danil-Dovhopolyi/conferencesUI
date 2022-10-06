import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import './App.scss';
import CreateConference from './routes/CreateConference';
import InfoConference from './routes/InfoConference';
import EditConference from './routes/EditConference';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create/new" element={<CreateConference />} />
        <Route path="/info" element={<InfoConference />} />
        <Route path="/edit" element={<EditConference />} />
      </Routes>
    </div>
  );
}

export default App;
