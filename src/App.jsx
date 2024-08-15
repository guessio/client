import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from './pages/MainLayout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AddPlayerPage from './pages/AddPlayerPage';


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path : "/add-player",
        element : <AddPlayerPage/>
      },
      {
        path:'/app',
        element:<DashboardPage/>
      }
    ]
  }
]);

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App