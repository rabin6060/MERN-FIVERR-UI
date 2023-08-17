
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Home from "./pages/home/Home"
import Add from "./pages/add/Add"
import Gigs from "./pages/gigs/Gigs"
import Gig from "./pages/gig/Gig"
import Messages from "./pages/messages/Messages"
import Message from "./pages/message/Message"
import Orders from "./pages/orders/Orders"
import MyGigs from "./pages/myGigs/MyGigs"
import './app.scss'
import Layout from "./Layout";
import Login from "./pages/login/Login";
import Register from './pages/register/Register'
import Pay from "./pages/pay/Pay";
import Sucess from './pages/sucess/Sucess'


function App() {

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/gigs',
          element:<Gigs/>
        },
        {
          path:'/gig/:id',
          element:<Gig/>
        },
        {
          path:'/orders',
          element:<Orders/>
        },
        {
          path:'/messages',
          element:<Messages/>
        },
        {
          path:'/message/:id',
          element:<Message/>
        },
        {
          path:'/mygigs',
          element:<MyGigs/>
        },
        {
          path:'/add',
          element:<Add/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/pay/:id',
          element:<Pay/>
        },
        {
          path:'/success',
          element:<Sucess/>
        },
        {
          path:'/register',
          element:<Register/>
        }
      ]
    },
  ]);
  
  
  return (
    <div>
      <RouterProvider router={router} /> 
    </div>
  )

    
  
}

export default App
