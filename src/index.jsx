import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import Home from './Components/Home.jsx';
import Layout from './Components/Layout.jsx';

import Projects from './Components/Projects.jsx';
import Blogs from './Components/Blogs.jsx';
import Error from './Components/Error.jsx';
import BlogPage from './Components/BlogPage.jsx';
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
