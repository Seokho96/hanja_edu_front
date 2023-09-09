import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import QuizSelectPage from './pages/QuizSelectPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import LevelPage from './pages/LevelPage';
import DashboardAppPage from './pages/DashboardAppPage';
import QuizPage from './pages/QuizPage';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/level" /> },
        { path: 'home', element: <DashboardAppPage /> },
        { path: 'level', element: <LevelPage /> },
        { path: 'level/:level', element: <QuizSelectPage /> },
        { path: 'blog', element: <BlogPage /> },
        {path:'quiz/:chapCode', element:<QuizPage />}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
      index: true
    },
    {
      path:"error",
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/error/404" replace />,
    },
  ]);

  return routes;
}
