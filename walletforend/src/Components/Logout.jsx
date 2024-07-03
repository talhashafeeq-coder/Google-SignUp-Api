import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/signIn');
    };

    return (
        <button  className='navbarstylebtn' onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
