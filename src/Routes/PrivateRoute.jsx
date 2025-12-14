import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Components/Loader';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();


    if(loading){
        return <Loader></Loader>;
    }


    if(!user){
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }

    return children;
   
};

export default PrivateRoute;