import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Admin from './Admin';
function App(){
return(
  <Router>
    <Routes>
      <Route path= "/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/admin" element={<Admin/>}/>
    </Routes>
  </Router>
)
}

export default App;