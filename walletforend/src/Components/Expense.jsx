import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import Navbar from './Navbar'
function Expense() {
    const navigate = useNavigate()
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/expense', {
                amount, description
            });
            // console.log('Expense added successfully:', response.data);
            navigate('/')
            // Reset form fields after successful submission
            setAmount('');
            setDescription('');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };
    return (
        <>
            <Navbar />
            <div className="container wallet mt-5" style={{ maxWidth: '100%' }}>
                <div className="row justify-content-center">
                    <div className="col-sm-8 col-md-6 col-lg-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-center mb-4">Add Expense</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            placeholder="Amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                            rows="3"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100">
                                       Add Expense
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
               
        </>
    );
}
export default Expense;
