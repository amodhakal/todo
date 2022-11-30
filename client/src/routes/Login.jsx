import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    redirectUser()
  })

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
      <br />
      <Link to="/register">No account, register!</Link>
    </form>
  );

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("/api/login", { email, password })
      .then((res) => {
        res.data.error
          ? alert("Invalid Credentials")
          : cookie.set("token", res.data.token);
        redirectUser()
      })
      .catch((err) => console.log(err));
  }

  function redirectUser() {
    if (cookie.get("token")) {
      navigate("/");
    }
  }
}
