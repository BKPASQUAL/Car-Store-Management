import React from "react";
import { Checkbox } from "rsuite";
import { Button } from "react-bootstrap";
import "rsuite/dist/rsuite-no-reset.min.css";
import "../assets/css/Login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useLoginUserMutation } from "../store/api/authApi";

function Login() {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(getValues());
      console.log("loginUser", response);
      if (response.data && !response.data.error) {
        const accessToken = response.data.payload.accessToken;
        const roleId = response.data.payload.roleId;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("roleId", roleId);
        navigate("home/dashboard");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Welcome to the Car Management!",
        });
      } else {
        console.log("Login Error", response);
        Swal.fire({
          title: "Oops...",
          text: response?.error?.data?.payload || response?.data?.payload,
          icon: "error",
        });
      }
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  useEffect(() => {
    document.title = "LogIn | Management";
  }, []);

  return (
    <div className="login-main">
      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        <input
          type="text"
          className="login-name"
          placeholder="Username"
          {...register("username")}
        />
        <input
          type="password"
          className="login-pass"
          placeholder="Password"
          {...register("password")}
        />
        <Button type="submit" className="login-btn">
          Login
        </Button>
        <div className="login-form-bot">
          <p className="login-form-bot-forgot">Forgot Password</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
