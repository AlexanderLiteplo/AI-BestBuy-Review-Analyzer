import "bootstrap/dist/css/bootstrap.min.css";
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import Login from './components/Login';
import Search from './components/Search';
import Layout from './components/Layout';
import SearchHistory from './components/SearchHistory';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Cart from './components/Cart';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'Admin': 'admin'
}

function App() {

  return (
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/" element={<Search />} />
            <Route path="cart" element={<Cart />} />
            <Route path="history" element={<SearchHistory />} />
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;