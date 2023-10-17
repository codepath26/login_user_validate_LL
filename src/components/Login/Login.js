import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../Store/authContext";
const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return {value : action.val , isValid : action.val.includes('@')};
  }
  if(action.type === "INPUT_BLUR"){
    return {value : state.value , isValid : state.value.includes('@')}
  }
  return { value: "" , isValid : false };
};
const passwordReducer = (state , action)=>{
  if(action.type === "USER_PASS"){
  return {value : action.val , isValid : action.val.trim().length > 6};
  }
  if(action.type === 'PASS_BLUR'){
    return {value : state.value , isValid : state.value.trim().length > 6};
  }
  return { value : '' , isValid : false};
}
const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredCollegeName, setEnteredCollegeName] = useState("");
  const [collegeNameIsValid, setCollegeNameIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, disptchEmail] = useReducer(emailReducer, {
    value: "",
    isValide: null,
  });
  const [passState, disptchPass] = useReducer(passwordReducer, {
    value: "",
    isValide: null,
  });
 const ctx =  useContext(AuthContext);
   useEffect(()=>{
    const identifier = setTimeout(() => {
      console.log("checking the form validity");
      setFormIsValid(
       emailState.isValid && passState.isValid
      );
    }, 500);

    return ()=>{
      console.log('Cleaning run');
      clearTimeout(identifier);
    }

   } ,[emailState , passState])

  const emailChangeHandler = (event) => {
    disptchEmail({
      type : "USER_INPUT",
      val : event.target.value
    })
    setFormIsValid(
     emailState.isValid && passState.isValid
    );
  };
  const collegeNameChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);
   
  };

  const passwordChangeHandler = (event) => {
    disptchPass({
      type : 'USER_PASS',
      val : event.target.value,
    })
    setFormIsValid(
      emailState.isValid && passState.isValid
     );
  };

  const validateEmailHandler = () => {
    disptchEmail({type : 'INPUT_BLUR'})
  };
  const validateCollegeNameHandler = () => {
    setCollegeNameIsValid(enteredCollegeName.length > 0);
  };

  const validatePasswordHandler = () => {
   disptchPass({type : 'PASS_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value,passState.value, enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegeName"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
