import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import {
  Dashboard,
  Explorer,
  Initial,
  Interests,
  Login,
  Matches,
  Properties,
  RegisterInterests,
  RegisterProperty,
  Signup,
} from './pages';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Navigate to='/initial' replace />} />
        <Route
          path='/login'
          element={token ? <Navigate to='/dashboard' /> : <Login />}
        />
        <Route
          path='/initial'
          element={token ? <Navigate to='/dashboard' /> : <Initial />}
        />
        <Route
          path='/signup'
          element={token ? <Navigate to='/dashboard' /> : <Signup />}
        />

        <Route element={<PrivateRoute isLogged={!!token} />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/matches' element={<Matches />} />
          <Route path='/properties' element={<Properties />} />
          <Route path='/register-interest' element={<RegisterInterests />} />
          <Route path='/register-property' element={<RegisterProperty />} />
          <Route path='/explorer' element={<Explorer />} />
        </Route>
      </Routes>
    </Router>
  );
}
