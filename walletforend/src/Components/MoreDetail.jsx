import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function MoreDetail() {
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [latestIncomeTime, setLatestIncomeTime] = useState(null);
    const [latestExpenseTime, setLatestExpenseTime] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const incomeResponse = await axios.get('http://localhost:3000/api/users/income');
                const expenseResponse = await axios.get('http://localhost:3000/api/users/expense');

                setIncome(incomeResponse.data);
                setExpense(expenseResponse.data);

                // Fetch latest entry time for income
                // const totalIncomeResponse = await axios.get('http://localhost:3000/api/users/income/total');
                // setLatestIncomeTime(totalIncomeResponse.data.latestEntryTime);

                // Fetch latest entry time for expense
                // const totalExpenseResponse = await axios.get('http://localhost:3000/api/users/expense/total');
                // setLatestExpenseTime(totalExpenseResponse.data.latestEntryTime);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar /> <hr /><hr />

            <div className='container'>
                <div className="row">
                    <div className="col-sm-5">
                        <h2 style={{ backgroundColor: "blue", color: "white" }}>Income</h2>
                        <ul>
                            {income.map((incomeItem, index) => (
                                <li key={index}> <b> Description:</b> {incomeItem.description} <br /><b> Amount:</b> ${incomeItem.amount} <data value="{latestIncomeTime}"></data> </li>
                            ))}
                        </ul>

                    </div>
                    <div className="col-sm-5">
                        <h2 style={{ backgroundColor: "red", color: "white" }}>Expense</h2>
                        <ul>
                            {expense.map((expenseItem, index) => (
                                <li key={index}>
                                    <b>Description:</b> {expenseItem.description} <br />
                                    <b>Amount:</b> ${expenseItem.amount} <br />
                                    {/* <b>Time:</b> {new Date(expenseItem.time).toLocaleString()} */}
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>

        </>
    );
}

export default MoreDetail;
