import React,{Fragment} from 'react'
import {Route,Redirect} from 'react-router-dom'
function MyRoute(props) {
    
        let{path,component:Com}=props;
        return(
            <Fragment>
                {
   window.sessionStorage.getItem('openId')?<Route path={props.path} component={Com}/>:<Redirect to='/login'/>                 
                }
            </Fragment>
        )
    
}
export default MyRoute;