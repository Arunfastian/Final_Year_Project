import React from "react";
import userContext from "./userContext";

const signUp = ()=>{

}

const logIn = ()=>{

}

const UserSate = (props)=>{
    return(
        <UserState.provider value={signUp, logIn} >
            {props.children}
        </UserState.provider>
    )
}

export default UserState