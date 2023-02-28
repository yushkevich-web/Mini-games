import React from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';

import { WheelPage } from './wheelPage';
import { LockerPage } from './lockerPage'
import { HomePage } from './homePage';
import { ChickenPage } from './chickenPage';
import { MazePage } from './mazePage';
import { RunesPage } from './runesPage';

export const router = createBrowserRouter([
  {  
    path: '/',
    element: <HomePage />
  },
    {  
    path: '/wheel',
    element: <WheelPage />
  },
  {  
    path: '/locker',
    element: <LockerPage />
  },
  {
    path: '/chicken',
    element: <ChickenPage />
  },
  {
    path: '/maze',
    element: <MazePage />
  },
  {
    path: '/runes',
    element: <RunesPage />
  },
  {  
    path: '*',
    element: <div>404 Page</div>
  },
])

export const Routing = () => {
  return <RouterProvider router={router} />
}