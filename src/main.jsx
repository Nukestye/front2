import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import Layout from './Components/Layout.jsx';
import Home from './Components/Home.jsx';

import ProjectPage from './Components/Projects/ProjectPage.jsx';
import Projects from './Components/Projects/Projects.jsx';
import BlogPage from './Components/Blogs/BlogPage.jsx';
import Blogs from './Components/Blogs/Blogs.jsx';
import Error from './Components/Error.jsx';
import Login from './Components/Login.jsx';
import { StrictMode } from 'react';

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {index: true, Component: Home},
      {path: '/back', Component: Home},
      {path: 'projects', Component: Projects},
      {path: 'p', element: <Navigate to="/projects" replace />},
      {path: 'p/:id', Component: ProjectPage},
      {path: 'blogs', Component: Blogs},
      {path: 'b', element: <Navigate to="/blogs" replace />},
      {path: 'b/:id', Component: BlogPage},
      {path: '/login', Component: Login},
      // {path: 'Not-Found', Component: Error},
      {path: '*', Component: Error},
    ]    
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
