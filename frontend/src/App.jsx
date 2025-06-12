import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Staff from './Staff';
import Admin from './Admin';


import Customer from './Customer';
import ViewCart from "./ViewCart";
import ViewFavorites from "./ViewFavorites";

import ForgotPassword from './ForgotPassword';
function App(){
return(
  <Router>
    <Routes>
      <Route path= "/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/staff" element={<Staff/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/customer" element={<Customer/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}  /> {/* New Route */}
      <Route path="/view-cart" element={<ViewCart />} />
      <Route path="/view-favorites" element={<ViewFavorites />} />
    </Routes>
  </Router>
)
}

export default App;