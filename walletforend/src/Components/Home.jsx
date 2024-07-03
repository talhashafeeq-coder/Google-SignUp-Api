import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Chart2 from './Chart2';
import Navbar from './Navbar';
import Chart from './Chart';
import ProgressBar from './ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt, faMoneyCheckAlt, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function Home() {
    const [value, onChange] = useState(new Date());//for calender
    const [user, setUser] = useState(null);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const nav = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    nav('/signup');
                    return;
                }
                const response = await axios.post('http://localhost:3000/api/users/getuser', { token });
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    localStorage.removeItem('token');
                    nav('/signup');
                }
            } catch (error) {
                localStorage.removeItem('token');
                nav('/signup');
            }
        };
        fetchUserData();

        const fetchData = async () => {
            try {
                const incomeResponse = await axios.get('http://localhost:3000/api/users/income');
                const expenseResponse = await axios.get('http://localhost:3000/api/users/expense');
                const balanceResponse = await axios.get('http://localhost:3000/api/balance');
                if (incomeResponse.status === 200 && expenseResponse.status === 200 && balanceResponse.status === 200) {
                    setIncome(incomeResponse.data);
                    setExpense(expenseResponse.data);
                    setTotalIncome(incomeResponse.data.reduce((acc, cur) => acc + cur.amount, 0));
                    setTotalExpense(expenseResponse.data.reduce((acc, cur) => acc + cur.amount, 0));
                    setTotalBalance(balanceResponse.data.balance);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [nav]);
    return (
        <>
            <Navbar />
            <hr />
            {/* //user Name Show */}
            {
                user && (
                    <div className="container py-5 px-5" style={{ textAlign: "center" }}>
                        <div className="row">
                            <div className="col-sm-5">
                                <h2>Hello, {user.username}!👋</h2>
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-6 py-3 px-5">
                                <Link to={'/income'} type='button' className='btn btn-lg btnsty2'>New income 🤑</Link>&nbsp;
                                <Link to={'/expense'} type='button' className='btn btn-lg btnStyle'>New expense 😤</Link>
                            </div>
                        </div>
                    </div>
                )}
            {/* Overviews & calendar */}
            <hr />
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h2><b>Overviews</b></h2>
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-4">
                        <Calendar onChange={onChange} value={value} />
                    </div>
                </div>

            </div>
            <hr />
            {/* Income and Expense */}
            <div className="container-fulid py-4 px-3" >
                <div className="row">
                    <div className="col-sm-4">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex h-24 w-full items-center gap-2 p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-trending-up h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10"
                            >
                            </svg>
                            <div className="flex flex-col items-start gap-0">
                                <h2 className="title text-muted-foreground"><FontAwesomeIcon icon={faMoneyBillAlt} style={{ color: "green" }} /> <span style={{ fontFamily: " oblique" }}> Income </span> </h2>
                                <span className="text-2xl justify-self-end">Total Income: <b>${totalIncome}</b></span>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex h-24 w-full items-center gap-2 p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-trending-up h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10"
                            >
                            </svg>
                            <div className="flex flex-col items-start gap-0">
                                <h2 className="title text-muted-foreground"><FontAwesomeIcon icon={faMoneyCheckAlt} style={{ color: "red" }} /> <span style={{ fontFamily: " oblique" }}> Expense</span> </h2>
                                <span className="text-2xl">  Total Expense: <b>${totalExpense}</b></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex h-24 w-full items-center gap-2 p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-trending-up h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10"
                            >
                            </svg>
                            <div className="flex flex-col items-start gap-0">

                                <h2 className="title text-muted-foreground"><FontAwesomeIcon icon={faBalanceScale} style={{ color: "blue" }} /> <span style={{ fontFamily: " oblique" }}> Total Balance </span> </h2>
                                <span className="text-2xl">  Total Balance: <b>${totalBalance}</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 ">
                        <div className="flex w-full flex-wrap gap-2 md:flex-nowrap"><div className="rounded-lg border bg-card text-card-foreground shadow-sm h-80 w-full col-span-6"><div className="flex flex-col space-y-1.5 p-6"><h3 className="text-2xl font-semibold leading-none tracking-tight grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col py-5 px-3">Incomes by category</h3></div><div className="flex items-center justify-between gap-2"><div className="flex h-60 w-full flex-col items-center justify-center m-4"><ProgressBar value={totalIncome} color="success" /></div></div></div>
                        </div>

                    </div>
                    <div className="col-sm-6 ">
                        <div className="flex w-full flex-wrap gap-2 md:flex-nowrap"><div className="rounded-lg border bg-card text-card-foreground shadow-sm h-80 w-full col-span-6"><div className="flex flex-col space-y-1.5 p-6"><h3 className="text-2xl font-semibold leading-none tracking-tight grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col py-5 px-3">Expenses by category</h3></div><div className="flex items-center justify-between gap-2"><div className="flex h-60 w-full flex-col items-center justify-center m-4"> <ProgressBar value={totalExpense} color="danger" /></div></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {/* Chart */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-6">
                        <Chart />
                    </div>
                    <div className="col-sm-6 mt-5">
                        <Chart2 />
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;
