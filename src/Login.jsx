import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== "meld123") {
      setErrorMsg(true);
    }
    axios
      .post("http://35.201.2.209:8000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data);
        localStorage.setItem("isLogin", true);
        if (response.data) {
            navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };

    useEffect(()=>{
        if(localStorage.getItem("isLogin", true)){
            navigate("/dashboard");  
        }
        },[])

  return (
    <div className="container">
      <div className="d-flex align-items-center">
        <div className="row w-100 mx-0" style={{ margin: "50px" }}>
          <div className="col-md-4 mx-auto" style={{marginTop:"150px"}}>
            <div className="login text-left py-3 px-4 px-sm-5">
              <h2 style={{textAlign:"center",marginBottom:"15px"}}>Login</h2>
              <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    aria-label="email"
                    aria-describedby="basic-addon1"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                     #
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    aria-label="email"
                    aria-describedby="basic-addon1"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    value={password}
                  />
                </div>
                <span
                  style={{
                    color: "red",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  {errorMsg ? "Wrong Email or Passwrod" : ""}
                </span>
                <div className="form-group" style={{textAlign:"center"}}>
                <button
                  type="submit"
                  className="btn btn-block btn-primary mt-1"
                >
                  Sign In
                </button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
