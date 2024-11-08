import React from "react";
import { Outlet, Link } from "react-router-dom";
import './NavigationBar.css'; 
 

function NavigationBar() { 
    return (
        <div className="layout">
            <div className="navigation-bar">
                <Link className='link' to='/'> Home </Link>
                <Link className='link' to='/plans'> Plans </Link>
                <Link className='link' to='/post'> Post A Question </Link>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default NavigationBar;