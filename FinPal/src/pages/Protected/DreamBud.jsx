import { useState } from "react"

export const DreamBud = () => {
    const [goals, setGoals] = useState({ GoalName: "",
        TargetAmount: null,
        InitialAmount: null,
        Category: {
            EmergencySavings: false,
            TravelVacation: false,
            MajorPurchase: false,
            Education: false,
            HealthWellness: false,
            HomeProperty: false,
            Others:false
        },
        TargetDate: null,
        Description: ""
    });
    const handleChange =(e) =>{
        const [name, value] = e.target;
        setGoals((preValue) => {
            const newValue = {...preValue, [name] :value};
            console.log(newValue);
            return newValue;  
        })
    }







    return(
        <>
     <form action="">
        <label htmlFor="GName">Goal Name</label>
        <input type="text" id="GName" name="GoalName" value={goals.GoalName} onChange={handleChange}/>

         <label htmlFor="TAmount">Target Amount</label>
        <input type="number" id="TAmount" name="TargetAmount" value={goals.TargetAmount} onChange={handleChange}/>

         <label htmlFor="IAmount">Initial Amount</label>
        <input type="number" id="IAmount" name="InitialAmount" value={goals.InitialAmount} onChange={handleChange}/>

         <label htmlFor="Cat">Goal Name</label>
       <select id="Cat" name="Category" onChange={handleChange}>
  <option value={goal.category.EmergencySaving}>Emergency Savings</option>
  <option value={goal.category.TravelVacation }> Travel & Vacation </option>
  <option value={goal.category.MajorPurchase}>Major Purchase</option>
  <option value={goal.category.Education}>Education</option>
  <option value={goal.category.HealthWellness}>Health & Wellness</option>
  <option value={goal.category.HomeProperty}>Home & Property</option>
  <option value={goal.category.Others}>Others</option>
</select>

         <label htmlFor="TDate">Target Date</label>
        <input type="date" id="TDate" name="TargetDate" value={goals.GoalName} onChange={handleChange}/>

         <label htmlFor="Desc">Description(Optional)</label>
        <input type="text" id="Desc" name="Description" value={goals.GoalName} onChange={handleChange}/>
















     </form>
        </>
    )
}