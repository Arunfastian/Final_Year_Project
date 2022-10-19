import React from "react";
import { useState } from "react";

export default function SignUp() {
  const [data, setData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/User/SignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        firstName: data.first_name,
        lastName: data.last_name
      }), // body data type must match "Content-Type" header
    });
    const json = response.json()
    console.log(json);
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <h1 style={{textAlign: "center"}}>SignUp</h1>
        <div className="mb-3">
          <label
            htmlFor="first_name"
            className="form-label"
            value={data.first_name}
          >
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            onChange={onChange}
            value={data.first_name}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            onChange={onChange}
            value={data.last_name}
          />
        </div>
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
            value={data.email}
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
            value={data.password}
          />
        </div>{" "}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
