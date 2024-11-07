import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from '..'
import Home from '../pages/home'
import Movies from '../pages/movies'
import Series from '../pages/series'
import Movie_Details from '../pages/movie'
import Series_Details from '../pages/serie'
import About from '../pages/about'


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
                path: '/series',
                element: <Series/>
            },          
            {
                path: '/about',
                element: <About/>
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