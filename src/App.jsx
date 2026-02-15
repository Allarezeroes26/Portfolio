import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Homepage from './pages/Homepage';
import {ThemeProvider} from './components/themesProvider'
import { TooltipProvider } from './components/ui/tooltip';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Homepage />
        }
      ]
    }
  ])

  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
