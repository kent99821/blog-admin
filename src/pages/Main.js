import React  from "react";
import Login from "./Login";
import { BrowserRouter as Router, Route} from "react-router-dom";
import AdminIndex from "./AdminIndex";
import AddArticle from "./AddArticle";

function Main(){
    return(
        <Router>
            <Route path="/" exact component={Login} ></Route>
            <Route path="/admin/index" exact  component={AdminIndex}></Route>
            {/* <Route path="/admin/addarticle" exact component={AddArticle}></Route> */}
        </Router>
    )
}
export default Main;