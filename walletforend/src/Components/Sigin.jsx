import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("Shan@g-mail.com");
    const [password, setPassword] = useState("shan123");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };
        try {
            const response = await axios.post("http://localhost:3000/api/users/signIn", user);
            console.log(response.data);
            // localStorage.setItem("token", response.data.token);
            // if token already exist and new one is generated then it will be override
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate('/')
            }
            else {
                navigate('/signup')
            }
            // navigate('/home')
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="wrapper">
                <div className="container" style={{ maxWidth: "500px", backgroundColor: 'rgba(236, 240, 241,0.1)', padding: "30px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
                    <div className="row">
                        <div className="col-sm-8 offset-sm-2">
                            <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Sign In</h2>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div className="form-group" style={{ marginBottom: "15px" }}>
                                    <label htmlFor="email" style={{ marginBottom: "5px", display: "block", color: "#555" }}>Email address:</label>
                                    <input type="email" className="form-control inputstyle" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
                                </div>
                                <div className="form-group" style={{ marginBottom: "20px" }}>
                                    <label htmlFor="password" style={{ marginBottom: "5px", display: "block", color: "#555" }}>Password:</label>
                                    <input type="password" className="form-control inputstyle" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
                                </div>
                                <button type="submit" className="btn btn-lg sbBtn">Submit</button>
                                <hr />
                                <div className='AlreadyAccount'><Link to="/SignUp" style={{ color: "#54a0ff", textDecoration: "underline", cursor: "pointer", fontWeight: "bold" }}> Going to Sign-up?</Link></div>   
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SignIn;
