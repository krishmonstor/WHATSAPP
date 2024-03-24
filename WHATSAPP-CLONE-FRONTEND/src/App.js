import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Status from './components/Status/Status';
import StatusViewers from './components/Status/StatusViewers';
import Signin from './components/Register/Signin';
import Signup from './components/Register/Signup';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/status' element={<Status/>}></Route>
        <Route path='/status/:userId' element={<StatusViewers/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
