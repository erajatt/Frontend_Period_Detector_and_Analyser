import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Login({ setToken }) {
  const [details, setDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  //   const [loading, setLoading] = useState(false);
  const [, setCookies] = useCookies(["jwt"]);

  const login = async () => {
    if (details.email.length === 0 || details.password.length === 0)
      toast.error("Please enter all the fields");
    else {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/login`,
          details
        );

        const jwtToken = response.data.jwt;

        document.cookie = jwtToken;
        setToken(jwtToken);
        toast.success("Login successful");
        navigate("/home");
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <>
      <div className="font-montserrat">
        <div className={styles.mainContainer}>
          <div
            className={styles.registerBox}
            onKeyUp={(event) => {
              if (event.key == "Enter") login();
            }}
          >
            <div className={styles.title}>Login</div>

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
                placeholder="Password"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                required
              />
            </div>

            <button className={styles.submit} onClick={login}>
              Login
            </button>

            <div className="already">Not registered yet?</div>
            <a href="/register" className={styles.login}>
              Register Now!
            </a>
          </div>
          <div className={styles.imageContainer}>
            <img
              src="/Health.svg"
              alt="health"
              style={{ height: 700, width: 1300 }}
              className={styles.treasurebox}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
