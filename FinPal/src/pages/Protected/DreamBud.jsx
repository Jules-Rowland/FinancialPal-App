import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

export const DreamBud = () => {
  const [goals, setGoals] = useState({
    GoalName: "",
    TargetAmount: "",
    InitialAmount: "",
    Category: "",
    TargetDate: "",
    Description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setGoals({
      GoalName: "",
      TargetAmount: "",
      InitialAmount: "",
      Category: "",
      TargetDate: "",
      Description: "",
    });
  };

  const addGoals = async (goalData) => {
    try {
      // Normalize data types for Firestore
      const dataToSend = {
        ...goalData,
        TargetAmount: goalData.TargetAmount === "" ? null : Number(goalData.TargetAmount),
        InitialAmount: goalData.InitialAmount === "" ? null : Number(goalData.InitialAmount),
        TargetDate: goalData.TargetDate === "" ? null : goalData.TargetDate,
      };

      const docRef = await addDoc(collection(db, "(default)"), dataToSend);
      console.log("Goal added successfully with ID:", docRef.id);
      resetForm();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoals(goals);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="GName">Goal Name</label>
      <input
        type="text"
        id="GName"
        name="GoalName"
        value={goals.GoalName}
        onChange={handleChange}
        className="border p-2 m-2 w-50"
      />

      <label htmlFor="TAmount">Target Amount</label>
      <input
        type="number"
        id="TAmount"
        name="TargetAmount"
        value={goals.TargetAmount}
        onChange={handleChange}
        className="border p-2 m-2 w-50"
      />

      <label htmlFor="IAmount">Initial Amount</label>
      <input
        type="number"
        id="IAmount"
        name="InitialAmount"
        value={goals.InitialAmount}
        onChange={handleChange}
        className="border p-2 m-2 w-50"
      />

      <label htmlFor="Cat">Category</label>
      <select
        id="Cat"
        name="Category"
        value={goals.Category}
        onChange={handleChange}
        className="border p-2 m-2 w-50"
      >
        <option value="">Select Category</option>
        <option value="EmergencySavings">Emergency Savings</option>
        <option value="TravelVacation">Travel & Vacation</option>
        <option value="MajorPurchase">Major Purchase</option>
        <option value="Education">Education</option>
        <option value="HealthWellness">Health & Wellness</option>
        <option value="HomeProperty">Home & Property</option>
        <option value="Others">Others</option>
      </select>

      <label htmlFor="TDate">Target Date</label>
      <input
        type="date"
        id="TDate"
        name="TargetDate"
        value={goals.TargetDate}
        onChange={handleChange}
        className="border p-2 m-2 w-50"
      />

      <label htmlFor="Desc">Description (Optional)</label>
      <input
        type="text"
        id="Desc"
        name="Description"
        value={goals.Description}
        onChange={handleChange}
        className="border p-2 m-2 w-50"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 m-2 w-50">
        Create Goal
      </button>
    </form>
  );
};
