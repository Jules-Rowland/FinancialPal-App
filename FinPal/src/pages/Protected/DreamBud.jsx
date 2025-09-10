import { getDocs, collection, query, addDoc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../services/firebase";
import { Response } from "../../context/UserContext";
import { NavLink, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const DreamBud = () => {
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  
  // Controls form validation error display
  const [invalid, setInvalid] = useState(false);
  
  // Shows loading spinner while fetching goals from Firebase
  const [isLoading, setIsLoading] = useState(false);
  
  // Tracks which category filter button is currently active
  const [activeCategory, setActiveCategory] = useState("All Goals");
  
  // Stores the list of goals retrieved from Firebase
  const [rgoals, setRgoals] = useState([]);
  
  // Controls modal visibility for adding new goals
  const [isform, setIsForm] = useState(false);
  
  // ========================================
  // USER AUTHENTICATION & ROUTING
  // ========================================
  
  // Gets navigation state and location data
  const location = useLocation();
  
  // Gets user from context (logged in user)
  const { user: Retriveduser } = useContext(Response);
  
  // Gets user data passed through navigation
  const ImData = location.state;
  
  // Uses navigation user data if available, otherwise falls back to context user
  const user = ImData?.user || Retriveduser;
  
  // ========================================
  // FORM DATA STATE
  // ========================================
  
  // Stores form input values for creating new goals
  const [goals, setGoals] = useState({
    GoalName: "",
    TargetAmount: "",
    InitialAmount: "",
    Category: "",
    TargetDate: "",
    Description: "",
  });

  // ========================================
  // DATA FETCHING EFFECT
  // ========================================
  
  useEffect(() => {
    // Function to fetch goals from Firebase for the current user
    const RetrivedGoals = async () => {
      setIsLoading(true);
      try {
        // Query Firebase for all goals in the user's subcollection
        const q = await getDocs(
          query(collection(db, "users", user.uid, "goals"))
        );

        // Extract document data
        const requestedData = q.docs;
        
        // Map documents to include ID and spread document data
        const completeData = requestedData.map((docs) => {
          return { id: docs.id, ...docs.data() };
        });
        
        // Update state with fetched goals
        setRgoals(completeData);
      } catch (error) {
        console.error("Error extracting goal:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Only fetch goals if user exists and has a uid
    if (user?.uid) {
      RetrivedGoals();
    }
  }, [user?.uid]); // Re-run effect when user changes

  // ========================================
  // FORM HANDLING FUNCTIONS
  // ========================================
  
  // Updates form state when user types in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setGoals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validates required fields when user leaves an input
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if ((name === "TargetAmount" || name === "InitialAmount") && value === "") {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  };

  // ========================================
  // MODAL CONTROL FUNCTIONS
  // ========================================
  
  // Opens the modal for adding new goals
  const AddForm = (e) => {
    const { name, value } = e.target;
    setIsForm(true);
  };

  // Closes the modal
  const closeForm = () => {
    setIsForm(false);
  };

  // ========================================
  // FORM SUBMISSION FUNCTIONS
  // ========================================
  
  // Resets form fields to empty values
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

  // Adds a new goal to Firebase
  const addGoals = async (goalData) => {
    try {
      // Prepare data for Firestore (handle empty dates)
      const dataToSend = {
        ...goalData,
        TargetDate: goalData.TargetDate === "" ? null : goalData.TargetDate,
      };

      // Add document to user's goals subcollection
      const docRef = await addDoc(
        collection(db, "users", user.uid, "goals"),
        dataToSend
      );
      console.log("Goal added successfully with ID:", docRef.id);

      resetForm();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };
  
  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addGoals(goals);
      setRgoals([]); // Clear current goals
      await RetrivedGoals(); // Refetch goals to include new one
      setIsForm(false); // Close modal
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  
  // Calculates time remaining until target date
  const calculateTimeRemaining = (targetDate) => {
    const target = new Date(targetDate);
    const current = new Date();
    const totalDays = Math.ceil((target - current) / (1000 * 60 * 60 * 24));

    if (totalDays < 30) {
      return `${totalDays} days remaining`;
    } else {
      const months = Math.floor(totalDays / 30);
      const remainingDays = totalDays % 30;

      if (remainingDays === 0) {
        return `${months} ${months === 1 ? "month" : "months"} remaining`;
      } else {
        return `${months} ${
          months === 1 ? "month" : "months"
        } ${remainingDays} days remaining`;
      }
    }
  };

  // ========================================
  // CATEGORY FILTERING FUNCTIONS
  // ========================================
  
  // Handles category button clicks
  const handleCategoryClick = (e) => {
    const buttonId = e.target.id;
    setActiveCategory(buttonId);
  };

  // Calculates progress percentage for progress bar
  const calculateProgress = (initialAmount, targetAmount) => {
    const progressPercentage = (initialAmount / targetAmount) * 100;
    return progressPercentage;
  };

  // Filters goals based on selected category
  const FilteredGoals = () => {
    if (activeCategory === 'All Goals') {
      return rgoals; 
    }
    return rgoals.filter(goal => goal.Category === activeCategory);
  };

  // ========================================
  // COMPONENT RENDER
  // ========================================
  
  return (
    <>
      {/* ========================================
          MODAL FOR ADDING NEW GOALS
          ======================================== */}
      {isform ? (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="false"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          {/* Modal container with max height */}
          <div className="relative modal-content max-h-[200vh]">
            {/* Modal content box with styling */}
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 ">
              
              {/* Modal header with title and close button */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Goal
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeForm}
                >
                  {/* Close icon SVG */}
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              
              {/* Goal creation form */}
              <form onSubmit={handleSubmit} className="finpal-goal-form my-5">
                
                {/* Goal name input */}
                <div className="finpal-form-group my-5">
                  <label htmlFor="GName" className="finpal-form-label">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    id="GName"
                    name="GoalName"
                    value={goals.GoalName}
                    onChange={handleChange}
                    className="finpal-form-input"
                    placeholder="e.g., Emergency Fund"
                  />
                </div>

                {/* Target and initial amount inputs */}
                <div className="finpal-form-grid my-3">
                  <div className="finpal-form-group">
                    <label htmlFor="TAmount">Target Amount</label>
                    <input
                      type="number"
                      id="TAmount"
                      name="TargetAmount"
                      value={goals.TargetAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="finpal-amount-input"
                    />
                    {/* Validation error message */}
                    {invalid ? (
                      <p className="text-red-500 text-sm mt-1">
                        This field is required
                      </p>
                    ) : null}
                  </div>

                  <div className="finpal-form-group ">
                    <label htmlFor="IAmount">Initial Amount</label>
                    <input
                      type="number"
                      id="IAmount"
                      name="InitialAmount"
                      value={goals.InitialAmount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="finpal-form-input"
                    />
                    {/* Validation error message */}
                    {invalid ? (
                      <p className="text-red-500 text-sm mt-1">
                        This field is required
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Category selection dropdown */}
                <div className="finpal-form-group my-5">
                  <label htmlFor="Cat">Category</label>
                  <select
                    id="Cat"
                    name="Category"
                    value={goals.Category}
                    onChange={handleChange}
                    className="w-full finpal-form-input finpal-category-select"
                  >
                    <option value="">Choose Category</option>
                    <option value="EmergencySavings">💰 Emergency Savings</option>
                    <option value="TravelVacation">✈️ Travel & Vacation</option>
                    <option value=" MajorPurchase">🛍️ Major Purchase</option>
                    <option value="Education">📚 Education</option>
                    <option value="HealthWellness">💊 Health & Wellness</option>
                    <option value="HomeProperty">🏠 Home & Property</option>
                    <option value="Others">🎯Others</option>
                  </select>
                </div>
                
                {/* Target date input */}
                <div className="finpal-form-group">
                  <label htmlFor="TDate">Target Date</label>
                  <input
                    type="date"
                    id="TDate"
                    name="TargetDate"
                    value={goals.TargetDate}
                    onChange={handleChange}
                    className="w-full finpal-form-input"
                  />
                </div>

                {/* Optional description textarea */}
                <div className="finpal-form-group mt-5">
                  <label htmlFor="Desc">Description (Optional)</label>
                  <textarea
                    name="Description"
                    className="finpal-description-input "
                    id="Desc"
                    rows="3"
                    placeholder="Tell us more about this goal and why it's important to you..."
                    style={{
                      resize: "vertical",
                      fontFamily: "inherit",
                      borderColor: "var(--color-success)",
                      boxShadow: "rgba(0, 5, 2, 0) 0px 0px 0px 3px",
                    }}
                    value={goals.Description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                {/* Form submit button */}
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  className="finpal-goal-submit-btn"
                >
                  Create Goal
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      {/* ========================================
          PAGE HEADER WITH TITLE AND NAVIGATION
          ======================================== */}
      <div className="finpal-header-container w-screen justify-between -mx-5 px-10 overflow-hidden">
        <header className="justify-self-start">
          <h1 className="finpal-page-title">Dreambud Goals</h1>
          <p className="finpal-page-subtitle">
            Track your savings goals and watch your dreams grow
          </p>
        </header>

        {/* Navigation buttons */}
        <div className="justify-self-end flex gap-5">
          {/* Back to dashboard link */}
          <NavLink to="/dashboard">
            <button className="finpal-back-button"> ← Back to Dashboard</button>
          </NavLink>

          {/* Add new goal button - opens modal */}
          <button className="finpal-add-button" type="button" onClick={AddForm}>
            +Add New Goal
          </button>
        </div>
      </div>

      {/* ========================================
          CATEGORY FILTER BUTTONS
          ======================================== */}
      <div className="finpal-goal-categories">
        {/* All Goals filter button */}
        <button
          id="All Goals"
          className={`finpal-category-filter ${
            activeCategory === "All Goals" ? "active" : ""
          }`}
          onClick={handleCategoryClick}
        >
          All Goals
        </button>
        
        {/* Emergency Savings filter button */}
        <button
          id="EmergencySavings"
          className={`finpal-category-filter ${
            activeCategory === "EmergencySavings" ? "active" : ""
          }`}
          onClick={handleCategoryClick}
        >
          💰 Savings
        </button>
        
        {/* Travel filter button */}
        <button
          id="TravelVacation"
          className={`finpal-category-filter ${
            activeCategory === "TravelVacation" ? "active" : ""
          }`}
          onClick={handleCategoryClick}
        >
          ✈️ Travel
        </button>
        
        {/* Purchases filter button */}
        <button
          id="MajorPurchase"
          className={`finpal-category-filter ${
            activeCategory === "MajorPurchase" ? "active" : ""
          }`}
          onClick={handleCategoryClick}
        >
          🛍️ Purchases
        </button>
        
        {/* Education filter button */}
        <button
          id="Education"
          className={`finpal-category-filter ${
            activeCategory === "Education" ? "active" : ""
          }`}
          onClick={handleCategoryClick}
        >
          📚 Education
        </button>
        
        {/* Health filter button */}
        <button
          id="HealthWellness"
          className={`finpal-category-filter ${
            activeCategory === "HealthWellness" ? "active" : ""
          }`}
          onClick={handleCategoryClick}
        >
          💊 Health
        </button>
      </div>
      
      {/* ========================================
          SECTION HEADER
          ======================================== */}
      <div className="flex justify-between">
        <h1 className="finpal-section-title">Your Dreams in Progress</h1>
        <p className="finpal-goal-count">3 active goals</p>
      </div>

      {/* ========================================
          GOALS DISPLAY SECTION
          ======================================== */}
      {isLoading ? (
        // Loading state
        <p>Retrieving Goals</p>
      ) : FilteredGoals() === 0 ? null : (
        // Map through filtered goals and display each one
        FilteredGoals().map((goal) => (
            <Link to={`/trek/${goal.id}`} key={goal.id}>
          <div key={goal.id} className="finpal-goals-container">
            <div className="finpal-goal-card">
              
              {/* Goal icon/illustration */}
              <div className="finpal-goal-illustration--car finpal-goal-illustration ">
                🚗
              </div>
              
              {/* Goal information section */}
              <div className="finpal-goal-info">
                {/* Goal name */}
                <h1 className="finpal-goal-name">{goal.GoalName}</h1>
                
                {/* Goal progress details */}
                <p className="finpal-goal-progress">
                  <span className="pr-2">
                    {calculateTimeRemaining(goal.TargetDate)}
                  </span>
                  <span className="pr-2">• {goal.Category} • </span>
                  <span className="pr-2">
                    ${goal.TargetAmount - goal.InitialAmount}/month needed
                  </span>
                </p>
                
                {/* Progress bar */}
                <div className="finpal-goal-progress-bar ">
                  <div
                    className="finpal-goal-progress-fill"
                    style={{
                      width: `${calculateProgress(
                        goal.InitialAmount,
                        goal.TargetAmount
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Amount display section */}
              <div>
                <h1 className="finpal-current-amount">${goal.InitialAmount}</h1>
                <p className="finpal-target-amount">of ${goal.TargetAmount}</p>
              </div>
            </div>
          </div>
          </Link>
        ))
      )}
    </>
  );
};