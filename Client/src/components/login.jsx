import React from "react";
import { useState } from "react";

export default function Login() {

  const [Credentials, setCredentials] = useState({ email: "", password: "" });
  
  
  
  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/User/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Credentials.email,
        password: Credentials.password
      }), // body data type must match "Content-Type" header
    });
    const json = response.json()
    console.log(json);
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 style={{textAlign: "center"}}>Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
            value={Credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={onChange}
            value={Credentials.password}
          />
        </div>{" "}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
