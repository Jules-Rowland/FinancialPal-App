import { useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  collection,
  addDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { useEffect, useState, useContext, useCallback } from "react";
import { db } from "../../services/firebase";
import { Response } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Trek = () => {
  // Gets navigation state and location data
  const location = useLocation();

  // Gets user from context (logged in user)
  const { user: Retriveduser } = useContext(Response);

  // Gets user data passed through navigation
  const ImData = location.state;

  // Uses navigation user data if available, otherwise falls back to context user
  const user = ImData?.user || Retriveduser;

  // This hook is used to get parameters from the URL, allowing for a dynamic route.
  const { goalId } = useParams();

  // ========================================
  // STATE MANAGEMENT
  // ========================================

  const [trekSteps, setTrekSteps] = useState([]);
  // Stores the list of goals retrieved from Firebase
  const [goalData, setGoalData] = useState([]);

  // Shows loading spinner while fetching goals from Firebase
  const [isLoading, setIsLoading] = useState(false);

  // Toggles to true or false
  const [toggles, setToggles] = useState(false);
  // Stores the list of goals retrieved from Firebase
  const [rgoals, setRgoals] = useState([]);

  // ========================================
  // FORM DATA STATE
  // ========================================

  // Stores form input values for creating Trek Steps
  const [goalsStep, setGoalsStep] = useState({
    Steps: "",
    DueDate: "",
    Description: "",
  });

  // ========================================
  // MEMORIZED FUNCTIONS
  // ========================================

  // Memorize the data fetching function to prevent recreation on every render
  const ActiveGoalsAndTrek = useCallback(async () => {
    if (!user?.uid || !goalId) return;

    setIsLoading(true);
    try {
      // main goal document retrived from firestore
      const goalRef = doc(db, "users", user.uid, "goals", goalId);
      const goalDoc = await getDoc(goalRef);

      if (goalDoc.exists()) {
        const rgoalData = goalDoc.data();
        setGoalData(rgoalData);
        console.log("Goal data:", rgoalData);

        //  trek steps for this goal
        const trekCollectionRef = collection(
          db,
          "users",
          user.uid,
          "goals",
          goalId,
          "trek"
        );
        const trekQuery = query(trekCollectionRef);
        const trekSnapshot = await getDocs(trekQuery);

        // retrived trek steps to array with IDs
        const rtrekSteps = trekSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTrekSteps(rtrekSteps);
        console.log("Trek steps:", rtrekSteps);
      } else {
        console.log("Goal not found");
        setGoalData(null);
        setTrekSteps([]);
      }
    } catch (error) {
      console.error("Error getting goal and trek steps:", error);
      setGoalData(null);
      setTrekSteps([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid, goalId]); // Dependencies for useCallback

  const fetchAllGoals = useCallback(async () => {
    //This fetches all  goals from firestore when User clicks on the trek icon on the dashboard page
    if (!user?.uid) return;

    setIsLoading(true);
    try {
      const q = query(collection(db, "users", user.uid, "goals"));
      const querySnapshot = await getDocs(q);

      const goals = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRgoals(goals);
      console.log("All goals:", goals);
    } catch (error) {
      console.error("Error getting all goals:", error);
      setRgoals([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid]);

  // ========================================
  // FORM HANDLING FUNCTIONS
  // ========================================

  // Updates form state when user types in input fields for adding trek steps from users
  const handleChange = (e) => {
    const { name, value } = e.target;

    setGoalsStep((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const AddForm = () => {
    setToggles(true);
  };

  // Closes the modal
  const closeForm = () => {
    setToggles(false);
  };


  // Calculates time remaining until target date
  const calculateTimeRemaining = (targetDate) => {
    const target = new Date(targetDate);
    const current = new Date();
    const totalDays = Math.ceil((target - current) / (1000 * 60 * 60 * 24));

   if (totalDays < 30) {
  return `${totalDays} days remaining`;
} else {
  const months = Math.floor(totalDays / 30);
  return `${months} ${months === 1 ? "month" : "months"}`;
}
  };

//Displays Month-Year
const monthYear =(dateString)=>{
   const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });

}
// Returns: "Jan 2025"

  // ========================================
  // FORM SUBMISSION FUNCTIONS
  // ========================================

  // Resets form fields to empty values
  const resetForm = () => {
    setGoalsStep({
      Steps: "",
      DueDate: "",
      Description: "",
    });
  };

  // Adds a new Trek to Firebase
  const addTrek = async (goalTrek) => {
    // Always remember that goaltrek is just a placeholder for the actual data to be add to firestore db
    if (!user?.uid || !goalId) {
      console.error("User or goalId not available");
      return;
    }

    try {
      // Prepare data for Firestore (handle empty dates)
      const dataToSend = {
        ...goalTrek,
        DueDate: goalTrek.DueDate === "" ? null : goalTrek.DueDate,
      };

      // Add step to user's specific goalsid subcollection
      const docRef = await addDoc(
        collection(db, "users", user.uid, "goals", goalId, "trek"),
        dataToSend
      );
      console.log("Steps added successfully with ID:", docRef.id);

      resetForm();
    } catch (error) {
      console.error("Error adding goal:", error);
      throw error; // Re-throw to handle in handleSubmit
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required input fields for trek page
    if (!goalsStep.Steps.trim()) {
      alert("Please enter a trek title");
      return;
    }

    try {
      await addTrek(goalsStep);
      await ActiveGoals(); // Refetch goals to include new one
      setToggles(false); // Close Form
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error adding step. Please try again.");
    }
  };

  // ========================================
  // DATA FETCHING EFFECT
  // ========================================

  useEffect(() => {
    if (!user?.uid) return;

    if (goalId) {
      ActiveGoalsAndTrek();
    } else {
      fetchAllGoals();
    }
  }, [user?.uid, goalId, ActiveGoalsAndTrek, fetchAllGoals]); // All dependencies Accounted for

  // Early return if essential data is missing
  if (!goalId) {
    return <div>No goal selected</div>;
  }

  return (
    <>
      {goalData && trekSteps && (
        <div className="flex flex-col">
          <div className="finpal-header-container w-screen justify-between -mx-5 px-10 overflow-hidden">
            <header className="justify-self-start">
              <h1 className="finpal-page-title">{goalData.GoalName}</h1>
              <p className="finpal-page-subtitle">
                Track your journey step by step to achieve your goal.
              </p>
            </header>

            {/* Navigation buttons */}
            <div className="justify-self-end flex gap-5 mt-5">
              {/* Back to dashboard link */}
              <NavLink to="/dashboard">
                <button className="finpal-back-button">
                  {" "}
                  ← Back to Dashboard{" "}
                </button>
              </NavLink>

              {/* Add new goal button - opens modal */}
              <button
                className="finpal-add-button"
                type="button"
                onClick={AddForm}
              >
                +Add Step
              </button>
            </div>
          </div>
          <div className="secondRow bg-primary min-h-40 goal-overview">
            <header className="justify-self-start   mb-0">
              <h1 className="finpal-trek-title ">{goalData.GoalName}</h1>
              <p className="finpal-trek-subtitle"> {goalData.Description}</p>
            </header>
            <div className="grid grid-cols-3 justify-items-center gap-4 mb-10 -mt-10 ">
              <div className="text-center bg-transparent trekstat-items">
                <h1 className="Trek-stat-item">{goalData.TargetAmount}</h1>
                <p className="Trek-stat-label">Total Budget</p>
              </div>
              <div className="text-center bg-transparent trekstat-items">
                <h1 className="Trek-stat-item">{calculateTimeRemaining(goalData.TargetDate)}</h1>
                <p className="Trek-stat-label">Duration</p>
              </div>
              <div className="text-center bg-transparent trekstat-items">
                <h1 className="Trek-stat-item">{monthYear(goalData.TargetDate)}</h1>
                <p className="Trek-stat-label">Target Date</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
