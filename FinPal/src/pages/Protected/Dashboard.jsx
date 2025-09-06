import linechart from "../../assets/line-chart.svg";
import sprout from "../../assets/sprout.png";
import trek from "../../assets/trek.png";
import barchart from "../../assets/bar-chart.png";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { db } from "../../services/firebase";
import { Response } from "../../context/UserContext";
import { setDoc, doc,addDoc,collection } from "firebase/firestore";

export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
 const { user } = useContext(Response);
  const [forms, setForms] = useState({
    Amount: "",
    Category: "",
    Description: "",
    Date: "",
  });
  const [submit, setSubmit] = useState("");

  const handleIncomeclick = (e) => {
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm =()=>{
    setForms({ Amount: "",
    Category: "",
    Description: "",
    Date: "",}
     
    )
  }

  const onSubmit = (e) => {
    e.preventDefault();
    addIncome(forms);
  };

  

  const addIncome = async (goalData) => {
    try {
      // Normalize data types for Firestore
      const dataToSend = {
        ...goalData,
        Amount: goalData.Amount === "" ? null : Number(goalData.Amount),
        Category: goalData.Category === "" ? null : goalData.Category,
        Description: goalData.Description === "" ? null : goalData.Description,
        Date: goalData.Date === "" ? null : goalData.Date,
      };

      const docRef = await addDoc(
        collection(db, "users", user.uid, "Incomes"),
        dataToSend
      );
      console.log("Goal added successfully with ID:", docRef.id);
      resetForm();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col min-w-full m-10 ">
        <header className="">
          <h1 className="page-title ">Financial Dashboard </h1>
          <p className="page-subtitle">
            Welcome back, Sarah! Here's your financial overview.
          </p>
        </header>
      </div>
      <main className="flex flex-col w-screen px-10">
        <div className="min-w-full flex flex-col  lg:flex-row gap-6">
          <div className="flex-grow-3 col1   balance-card">
            <h1 className="balance-amount">$12,847.50</h1>
            <p className="balance-label"> Current Balance</p>
            <button className="balance-change">
              ↗ +$1,360 this month (+12.6%)
            </button>
            <div>
              {isOpen ? (
                <form className="">
                  <div className="flex bg-">
                    <div>
                      <label htmlFor="Ad">Amount ($)</label>
                      <input
                        type="number"
                        name="Amount"
                        id="Ad"
                        value={forms.Amount}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="Cat">Category</label>
                      <select
                        name="Category"
                        id="Cat"
                        value={forms.Category}
                        onChange={handleChange}
                      >
                        <option value="Salary">Salary</option>
                        <option value="Investment">Investment</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="Desc">Description</label>
                    <input
                      type="text"
                      name="Description"
                      id="Desc"
                      value={forms.Description}
                      onChange={handleChange}
                      placeholder="e.g., Grocery shopping at Walmart"
                    />
                  </div>
                  <label htmlFor="Dt"></label>
                  <input
                    type="date"
                    name="Date"
                    id="dt"
                    value={forms.Date}
                    onChange={handleChange}
                  />
                  <div>
                    <button onClick={onSubmit}>Add Income</button>
                  </div>
                </form>
              ) : null}
              <button
                className="quick-btn quick-btn:hover"
                onClick={handleIncomeclick}
              >
                + Add Income
              </button>
              <button className="quick-btn quick-btn:hover">
                - Add Expense
              </button>
              <button className="quick-btn quick-btn:hover">
                💳 Pay Bills
              </button>
            </div>
          </div>

          <div className="flex-grow-1 stats-card ">
            <h1 className="stats-card-title">This Month</h1>
            <div className="grid grid-cols-2 gap-10 mb-10 ">
              <div className="stat-item flex flex-col h-30 justify-center items-center ">
                <h1 className="stat-value-success">+$3,250</h1>
                <p className="stat-label">Income</p>
              </div>
              <div className="stat-item flex flex-col h-30 justify-center items-center">
                <h1 className="stat-value-danger">-$1,890</h1>
                <p className="stat-label">Expenses</p>
              </div>
            </div>
            <div className="chart-container flex flex-col justify-center items-center">
              <img src={linechart} alt="Chart" className="w-10 height-10" />
              <h1 className="finpal-chart-placeholder">
                Spending Trend
                <p>Click to view detailed charts</p>
              </h1>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
mt-20 mb-20 gap-5  "
        >
          <NavLink to="/dreambud">
            <div className="flex flex-row feature-card gap-5 min-h-50  ">
              <div className="feature-icon-dreambud feature-icon">🌱</div>
              <div className="flex flex-col gap-1">
                <h1 className="finpal-feature-title">Dreambud Goals</h1>
                <p className="finpal-feature-subtitle">3 active goals</p>
                <div>
                  <span></span>
                </div>
                <p className="finpal-feature-stats-text">
                  68% average progress
                </p>
              </div>
            </div>
          </NavLink>

          <NavLink to="/trek">
            <div className="flex flex-row feature-card gap-5 min-h-50">
              <div className="feature-icon-dreambud feature-icon">🗺️</div>
              <div className="flex flex-col gap-1">
                <h1 className="finpal-feature-title">Trek Journey</h1>
                <p className="finpal-feature-subtitle"> Europe Trip 2025</p>
                <div>
                  <span></span>
                </div>
                <p className="finpal-feature-stats-text">
                  68% average progress
                </p>
              </div>
            </div>
            
          </NavLink>

          <NavLink to="/spendsense">
            <div className="flex flex-row feature-card gap-5 min-h-50">
              <div className="feature-icon-dreambud feature-icon">📊</div>
              <div className="flex flex-col gap-1">
                <h1 className="finpal-feature-title">Spendsense</h1>
                <p className="finpal-feature-subtitle">Monthly analysis</p>
                <div>
                  <span></span>
                </div>
                <p className="finpal-feature-stats-text">
                  68% average progress
                </p>
              </div>
            </div>
          </NavLink>
        </div>
      </main>
    </>
  );
};
