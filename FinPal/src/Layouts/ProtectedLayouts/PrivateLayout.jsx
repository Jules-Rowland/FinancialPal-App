import { Outlet } from "react-router-dom"
import {SideNav} from "./SideNav"
import {TopNav} from "./TopNav"
function PrivateLayout(){
    return(
        <div >
          <TopNav /> 
    
      <div className="flex-1">
             <SideNav /> 
        <Outlet /> 
      </div>
    </div>
    )
}
export default PrivateLayout