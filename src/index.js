import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import Home from './Components/Home.js';
import Layout from './Components/Layout.js';

import Projects from './Components/Projects.js';
import Blogs from './Components/Blogs.js';
import Error from './Components/Error.js';
import BlogPage from './Components/BlogPage.js';
import ProjectPage from './Components/ProjectPage.jsx';


const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {index: true, Component: Home},
      {path: 'projects', Component: Projects},
      {path: 'p', element: <Navigate to="/projects" replace />},
      {path: 'p/:id', Component: ProjectPage},
      {path: 'blogs', Component: Blogs},
      {path: 'b', element: <Navigate to="/blogs" replace />},
      {path: 'b/:id', Component: BlogPage},
      {path: 'Not-Found', Component: Error},
      {path: '*', Component: Error},
    ]    
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
