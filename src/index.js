import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home.js';
import Layout from './Components/Layout.js';

import Projects from './Components/Projects.js';
import Blogs from './Components/Blogs.js';
import Error from './Components/Error.js';


const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {index: true, Component: Home},
      {path: 'projects', Component: Projects},
      {path: 'blogs', Component: Blogs},
      {path: '*', Component: Error}
    ]    
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
