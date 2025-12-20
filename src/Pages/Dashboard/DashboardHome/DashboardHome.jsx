import React from 'react';
import useRoles from '../../../Hooks/useRoles';
import AdminHome from './AdminHome';
import ModeratorHome from './ModeratorHome';
import StudentHome from './StudentHome';
import { useLoaderData } from 'react-router';

const DashboardHome = () => {
  
   const {role} = useRoles();
   console.log(role)

   if(role === 'Admin'){
      return <AdminHome></AdminHome>
   }
   else if(role === 'Moderator'){
      return <ModeratorHome></ModeratorHome>
   }
   else{
      return <StudentHome></StudentHome>
   }
};

export default DashboardHome;