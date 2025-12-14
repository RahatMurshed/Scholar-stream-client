import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const RootLayout = () => {
    return (
        <div >
            <div className='lg:w-10/12 md:w-11/12 mx-auto'>
                <div>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
            
            </div>

            <div>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default RootLayout;