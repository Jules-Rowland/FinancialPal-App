import { NavLink } from "react-router-dom"
function LandingPage (){
    return(
        <>
        <h1>Welcome Home</h1>
        <NavLink to="/login" > <button className="bg-blue-700 text-white rounded w-20">Login</button></NavLink>
       
       <NavLink to="/signup"> <button className="bg-blue-700 text-white rounded w-20 ">Sign Up</button></NavLink>
        </>
    )
}
export default LandingPage