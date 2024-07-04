import React, { useState } from "react";
import "./LoginPage.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import users from "../../assets/users.json";

export function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setisValid] = useState(null);

  const handleLogin = () => {
    const isValid = validateUser(username, password);
    if (isValid) {
      console.log("Login successful");
      onLogin(username);
      setisValid(true)
    } else {
      setisValid(false)
    }
  };

  const validateUser = (username, password) => {
    const user = users.find(
      (user) =>
        (user.username === username || user.email === username) &&
        user.password === password
    );
    return !!user;
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol md="6" className="mb-5">
          <div className="d-flex flex-column ms-md-5">
            <div className="text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{ width: "185px" }}
                alt="logo"
              />
            </div>

            <h4>Login</h4>

            <MDBInput
              wrapperClass="mb-4"
              placeholder="Username/Email Address"
              id="txtusername"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-2"
              placeholder="Password"
              id="txtpassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isValid === false && 
            <span className="mb-2 mt-0" style={{color: "red"}}>
              The username or password is incorrect
            </span>
}
            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn
                className="mb-4 w-100 gradient-custom-2"
                onClick={handleLogin}
              >
                Sign in
              </MDBBtn>
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn outline className="mx-2" color="danger">
                Create Now
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6" className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4 ">
              <h4 className="mb-4 ">Your Local Store</h4>
              <p className="small mb-0">Lowest Prices Guaranteed</p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
