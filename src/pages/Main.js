import React  from "react";
import Login from "./Login";
import { BrowserRouter as Router, Route} from "react-router-dom";
import AdminIndex from "./AdminIndex";

function Main(){
    return(
        <Router>
            <Route path="/login/" exact component={Login}></Route>
            <Route path="/index/" exact component={AdminIndex}></Route>
        </Router>
    )
}
export default Main;