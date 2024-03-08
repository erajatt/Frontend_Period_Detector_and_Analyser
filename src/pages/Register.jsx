import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [details, setDetails] = useState({
    email: "",
    name: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const register = async () => {
    if (details.email.length === 0)
      toast.error("Please enter your Email address");
    else if (details.name.length === 0)
      toast.error("Please enter your Full Name");
    else if (details.username.length === 0)
      toast.error("Please enter your username");
    else if (details.password.length < 8)
      toast.error("Password must be at least 8 characters");
    else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/register",
          details
        );

        toast.success("Registration successful. Login to continue.");
        navigate("/");
      } catch (error) {
        console.error(error.response);
        toast.error("An error occurred.");
      }
    }
  };

  return (
    <div className="font-montserrat">
      <div className={styles.mainContainer}>
        <div
          className={styles.registerBox}
          onKeyUp={(event) => {
            if (event.key === "Enter") register();
          }}
        >
          <div className={styles.title}>Register</div>{" "}
          <div className={styles.inputDiv}>
            <input
              type="name"
              className={styles.inputField}
              placeholder="Name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <input
              type="email"
              className={styles.inputField}
              placeholder="Email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <input
              type="password"
              className={styles.inputField}
              placeholder="Create New Password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <input
              type="username"
              className={styles.inputField}
              placeholder="Username"
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              required
            />
          </div>
          <button className={styles.submit} onClick={register}>
            {"Register"}
          </button>
          <div className={styles.already}>Already Registered?</div>
          <a href="/" className={styles.login}>
            Login
          </a>
        </div>
        <div className={styles.imageContainer}>
          <img
            src="/Health.svg"
            alt="health"
            style={{ height: 600, width: 1200 }}
            className={styles.treasurebox}
          ></img>
        </div>
      </div>
    </div>
  );
}
