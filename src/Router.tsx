import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './views/Home.page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
]);

export function Router() {
    return <RouterProvider router={router} />;
}