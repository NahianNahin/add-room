import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../shared/Home';



const Main = () => {
    return (
        <div className='max-w-[1500px] mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Main;