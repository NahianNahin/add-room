import { createBrowserRouter } from "react-router-dom";
import RoomUpload from "../component/RoomUpload";
import Main from "../layouts/Main";
import Login from "../pages/Login/Login";
import Signup from "../pages/Login/Signup";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <RoomUpload></RoomUpload>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            
        ]
    },
    

])