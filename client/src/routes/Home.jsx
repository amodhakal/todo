import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookie.get("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return <>Home</>;
}
