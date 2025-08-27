import { useState, useEffect, useContext, useRef } from "react";
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [erroremail, setErrorEmail] = useState('');
  const [errorpassword, setErrorPassword] = useState('');
  const userState = useContext(Response);
   const typingTimer = useRef(null);
   const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((preValue) => {
      const newValue = { ...preValue, [name]: value };
      console.log(newValue);
      return newValue;
    });

    if (name ==="email"  || name === "password")
      if (typingTimer.current) clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(()=>{
            validateField(name, value);
      }, 2000)
  }

    const validateField = (name, value) => {
    
      if (name === "email") {
        if (!value.includes("@")) setErrorEmail("Invalid Email");
        else setErrorEmail("");
      }

      if (name === "password") {
        if (value.length < 6) setErrorPassword("Password too short");
        else setErrorPassword("");
      }
    
  };
  


  const resetForm = () => {
    setValues({ name: "", email: "", password: "", confirmPassword: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
 const { email, password, confirmPassword } = values;

  // Optional: check if passwords match
  if (password !== confirmPassword) {
    console.log("Passwords do not match!");
    return;
  }

  try {
    const userInfo = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userInfo.user);
    navigate("/Dashboard");
    resetForm(); // Clear the form on success
  } catch (error) {
    console.log("Error signing up:", error.message);

    // Optional: Firebase-specific error handling
    if (error.code === "auth/email-already-in-use") {
      console.log("This email is already in use.");
    } else if (error.code === "auth/invalid-email") {
      console.log("Invalid email address.");
    } else if (error.code === "auth/weak-password") {
      console.log("Password should be at least 6 characters.");
    }
  }
}


  return (
    <div className="bg-[#0076DA] w-full min-h-screen ">
      <div className=" bg-[#FFFFFF] container m-auto rounded pt-5 pb-10">
        <form className="flex flex-col ml-5 " onSubmit={handleSubmit}>
          <label htmlFor="Name">Name</label>
          <input
            className="border p-2 m-2 w-50"
            type="text"
            name="name"
            id="Name"
            value={values.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            className="border p-2 m-2 w-50"
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
          <span>{erroremail}</span>

          <label htmlFor="password">Password</label>
          <input
            className="border p-2 m-2 w-50"
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
          <span>{errorpassword}</span>

          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            className="border p-2 m-2 w-50"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <span>{values.password !== values.confirmPassword ? "Password do not match" : ""}</span>


          <button className="bg-blue-500 text-white p-2 m-2 w-50">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
export default Signup