import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Staff from './Staff';
import Admin from './Admin';
import Admin1 from './Admin1';
import Staff1 from './Staff1';
function App(){
return(
  <Router>
    <Routes>
      <Route path= "/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/staff" element={<Staff/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/admin1" element={<Admin1/>}/>
      <Route path="/staff1" element={<Staff1/>}/>
    </Routes>
  </Router>
)
}

export default App;