import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { username, email, password };
        try {
            const response = await axios.post("http://localhost:3000/api/users/signup", newUser);
            navigate("/signin");
            // console.log(response.data);
            // if (response.data.success) {
               
            //     console.log("Signup successful");
            // } else {
            //     alert(response.data.message);
            // }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="wrapper">
                <div className="container" style={{ maxWidth: "600px", backgroundColor: 'rgba(236, 240, 241,0.1)', padding: "30px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2">
                            <h4 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Sign Up</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Name:</label>
                                    <input type="text" className="form-control inputstyle" value={username} required onChange={e => setUsername(e.target.value)} placeholder="User Name" style={{ marginBottom: "15px", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address:</label>
                                    <input type="email" className="form-control inputstyle" value={email} required onChange={e => setEmail(e.target.value)} placeholder="Enter email" style={{ marginBottom: "15px", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control inputstyle" value={password} required onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ marginBottom: "20px", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
                                </div>
                                <button type="submit" className="btn btn-lg sbBtn" >Submit</button>
                                <div style={{ marginTop: "40px", textAlign: "center", color: "#666" }}>To Another Account </div>
                                <hr />
                            </form>
                            <div className="container mt-5" style={{ textAlign: "center" }}>
                                    <button className="btn-lg btn " onClick={() => (window.location.href = 'http://localhost:3000/auth/google')} style={{ backgroundColor: "#DB4437", color: "#fff", borderRadius: "5px", cursor: "pointer" }}>To Google </button>
                                </div> <hr />
                                <div className='AlreadyAccount'> <Link to="/SignIn" style={{ color: "#54a0ff", textDecoration: "underline", cursor: "pointer", fontWeight: "bold" }}> Already have an account?</Link></div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
