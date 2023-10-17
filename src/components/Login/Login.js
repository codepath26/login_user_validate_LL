import React, { useContext, useEffect, useReducer, useState } from "react";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../Store/authContext";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_PASS") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASS_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
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
  const ctx = useContext(AuthContext);
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking the form validity");
      setFormIsValid(emailState.isValid && passState.isValid);
    }, 500);

    return () => {
      console.log("Cleaning run");
      clearTimeout(identifier);
    };
  }, [emailState, passState]);

  const emailChangeHandler = (event) => {
    disptchEmail({
      type: "USER_INPUT",
      val: event.target.value,
    });
    setFormIsValid(emailState.isValid && passState.isValid);
  };
  const collegeNameChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    disptchPass({
      type: "USER_PASS",
      val: event.target.value,
    });
    setFormIsValid(emailState.isValid && passState.isValid);
  };

  const validateEmailHandler = () => {
    disptchEmail({ type: "INPUT_BLUR" });
  };
  const validateCollegeNameHandler = () => {
    setCollegeNameIsValid(enteredCollegeName.length > 0);
  };

  const validatePasswordHandler = () => {
    disptchPass({ type: "PASS_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passState.value, enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailState.isValid}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          value={emailState.value}
          label="E-Mail"
        />
        <Input
          isValid={collegeNameIsValid}
          type="text"
          id="collegeName"
          onChange={collegeNameChangeHandler}
          onBlur={validateCollegeNameHandler}
          value={enteredCollegeName}
          label="College Name"
        />
        <Input
          isValid={passState.isValid}
          type="password"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          value={passState.value}
          label="Password"
        />
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
