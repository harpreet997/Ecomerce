import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginLogo from '../images/Login_Logo.PNG';
import '../styles/login.css';
import axios from "axios";

export default function Login() {
  const [showerror, setShowerror] = useState(false);
  const [data1, setData1] = useState({
    email: "",
    password: "",
  });
  let headers = {
    authorization: `${localStorage.getItem('token')}`
  }
  console.log('headers', headers.authorization);
  console.log(typeof headers);
  const navigate = useNavigate();
  const handleInput = (event) => {
    setData1({ ...data1, [event.target.name]: event.target.value });
  };

  const handleReset = () => {
    setData1({ email: "", password: "" });
  };

  const handleSubmit = () => {
    console.log(data1);
    if (data1.email !== "" && data1.password !== "") {
      if (data1) {
        let payload = {
          email: data1.email,
          password: data1.password,
        };
        axios
          .post("http://localhost:3500/api/login", payload)
          .then((val) => {
            if (val.data.token) {
              localStorage.setItem("token", val.data.token);
              localStorage.setItem("refresh", val.data.refresh);
            }
          })
        alert("Login Successfully");
        navigate("/dashboard");
        window.location.reload(false);


        handleReset();
      }
    } else {
      alert("Invalid entry");
      setShowerror(true);
    }
  };

  return (
    <div>
      <section>
        <div className="container-fluid h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-lg-12 col-xl-11 ">
              <div className="card text-black ">
                <div className="card-body p-md-5 ">
                  <div className="row justify-content-center">
                    <div className="row">
                      <div className="col-md-5 col-lg-5">
                        <div className="Login_img col-md-6">
                          <img
                            src={LoginLogo}
                            alt="LoginLogo"
                            width="400"
                            height={400}
                            style={{ marginLeft: "58px", marginTop: "35px" }}
                            className="logo"
                          />
                        </div>
                      </div>
                      <div className="col-xs-1 col-md-1 col-lg-1 d-flex">
                        <div className="vertical-line vr"></div>
                      </div>


                      <div className="col-md-6 col-lg-6 col-xl-6 order-2 ">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Login
                        </p>

                        <form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fa fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                id="form3Example3c"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={(event) => {
                                  handleInput(event);
                                }}
                              />
                              <p style={{ color: "red" }}>
                                {showerror && data1.email === ""
                                  ? "Please fill valid entry"
                                  : null}{" "}
                              </p>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                id="form3Example4cd"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                onChange={(event) => {
                                  handleInput(event);
                                }}
                              />
                              <p style={{ color: "red" }}>
                                {showerror && data1.password === ""
                                  ? "Please fill valid entry"
                                  : null}{" "}
                              </p>
                            </div>
                          </div>
                          <div class="form-check mb-0">
                            <input
                              class="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3"
                              style={{ marginLeft: "-22px", marginTop: "4px" }}
                            />
                            <label
                              class="form-check-label remember"
                              style={{ marginRight: "150px", marginTop: "1px" }}
                              for="form2Example3"
                            >
                              Remember me
                            </label>
                            <div
                              className="forgot_pwd forgot-password"
                              style={{
                                marginLeft: "280px",
                                marginTop: "-27px",
                              }}
                            >
                              <a href="#!" className="text-body">
                                {" "}
                                Forgot password?
                              </a>
                            </div>
                          </div>

                          <div className="d-flex justify-content-center mb-3 mb-lg-4">
                            <button
                              type="button"
                              className=" loginbtn btn btn-warning btn-lg"
                              style={{
                                width: "133px",
                                marginTop: "30px",
                              }}
                              onClick={() => {
                                handleSubmit();
                              }}
                            >
                              Login
                            </button>

                          </div>
                        </form>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}