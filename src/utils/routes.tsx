import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from '..'
import Home from '../pages/home'
import Movies from '../pages/movies'
import Series from '../pages/series'
import Billing from '../pages/billing'
import Movie_Details from '../pages/movie'
import Series_Details from '../pages/serie'
import Movies_Gender from '../pages/moviesByGender'
import Series_Gender from '../pages/seriesByGender'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,        
        children: [     
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/movies',
                element: <Movies/>
            },
            {
                path: '/movies/:gender/:id',
                element: <Movies_Gender/>
            },
            {
                path: '/series',
                element: <Series/>
            },
            {
                path: '/series/:gender/:id',
                element: <Series_Gender/>
            },
            {
                path: '/pricing',
                element: <Billing/>
            }, 
            {
                path: '/movie/:id',
                element: <Movie_Details />
            },
            {
                path: '/serie/:id',
                element: <Series_Details/>
            }   
        ]
    }
])

function Routes() {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes