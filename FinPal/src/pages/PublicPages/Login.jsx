import { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Login (){
const {handleSubmit, register, formState:{errors}} = useForm();
  const navigate = useNavigate();
const onSubmit= async(data)=>{

  console.log(data);
  const {email, password} = data;

  alert("Login Successful");
 try {
  const validate = await signInWithEmailAndPassword(auth, email, password);
   console.log("User signed up:", validate);
       navigate("/Dashboard");
 } catch (error) {
  console.log("Error signing up:", error.message);
 }


}




  return (
  <>
    <div className="bg-[#0076DA] w-full min-h-screen ">
      <div className=" bg-[#FFFFFF] container m-auto rounded pt-5 pb-10">
        <form className="flex flex-col ml-5 " onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="Email">Email</label>
          <input
            className="border p-2 m-2 w-50"
            type="email"
            name="email"
            id="Email"
            {...register ("email", {required:"Email is required",
              pattern: {value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address"
               }
            })}
          />
          <div>{errors.email && <span>{errors.email.message}</span>}</div>

          <label htmlFor="Password">Password</label>
          <input
            className="border p-2 m-2 w-50"
            type="password"
            name="password"
            id="Password"

            {...register ("password", {required:"Password is required",
              pattern: {value: /^(?=.*\d).{6,}$/,
                message: "Please enter yor correct Password"
               }
            })}
          />

              <div>{errors.password && <span>{errors.password.message}</span>}</div>

            <button className="bg-blue-500 text-white p-2 m-2 w-50" >
            Sign up
          </button>
          </form>
          </div>
          </div>
          </>
    )
    
}

export default Login