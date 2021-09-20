import React  from "react";
import Login from "./Login";
import { BrowserRouter as Router, Route} from "react-router-dom";
import AdminIndex from "./AdminIndex";
import AddArticle from "./AddArticle";

function Main(){
    return(
        <Router>
            <Route path="/" exact component={Login} ></Route>
            <Route path="/admin/"   component={AdminIndex}></Route>
        </Router>
    )
}
export default Main;