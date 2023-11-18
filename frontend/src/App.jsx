import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ROUTES from './helpers/PathRouters';

import './App.css';

function App() {
  return (
    <div>
      {location.pathname !== ROUTES.LOGIN &&
        location.pathname !== ROUTES.REGISTER && <Nav />}
      <Routes>
        {/* //las rutas hay que parametrizarlas. Carpeta helpers, archivo RoutesPath, objeto ROUTES.HOME */}
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        <Route path={ROUTES.REGISTER} element={<Register />}></Route>
        <Route path={ROUTES.HOME} element={<Notes />}></Route>
      </Routes>
    </div>
  );
}

export default App;
