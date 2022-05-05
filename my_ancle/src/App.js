import './App.css';
import Client from './Client/Client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Download from './Download/Download';
import { DataProvider, GlobaleState } from './GlobaleState';
import OldClient from './OldClient/OldClient';
import GetClients from './GetClients/GetClients';
import ClientPage from './ClientPage/ClientPage';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import { useContext } from 'react';
import Pages from './pages/Pages';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Navbar />
        <Pages />
      </DataProvider>
    </div>
  );
}

export default App;
