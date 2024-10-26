import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import Landing from './pages/Landing';
import PhaserGame from './pages/Game/Skill/PhaserGame';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Landing />} />,
      <Route path="app/" element={<Outlet />}>
        <Route
          index
          element={<h1>Welcome to the game center to select game</h1>}
        />
        <Route path="luck/" element={<h1>Here the game of luck will go</h1>} />
        <Route path="skill/" element={<PhaserGame />} />
      </Route>
      ,
      <Route path="about/" element={<h1>About us</h1>} />,
    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
