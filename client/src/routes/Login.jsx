import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    redirectUser();
  });

  return (
    <div className="page">
      <div className="item-holder">
        <div className="title-holder">
          <h1 className="title">Sign in!</h1>
        </div>
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <br />
          <button type="submit" className="form-btn">
            Submit
          </button>
          <br />
        </form>
        <div className="link-holder">
          <Link to="/register" className="link">No account, register!</Link>
        </div>
      </div>
    </div>
  );

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("/api/login", { email, password })
      .then((res) => {
        res.data.error
          ? alert("Invalid Credentials")
          : cookie.set("token", res.data.token);
        redirectUser();
      })
      .catch((err) => console.log(err));
  }

  function redirectUser() {
    if (cookie.get("token")) {
      navigate("/");
    }
  }
}
