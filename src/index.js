import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Components/Layout.js';

import Home from './Home.js';


const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {index: true, Component: Home},
    ]    
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
