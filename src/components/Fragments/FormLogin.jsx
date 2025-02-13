import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { login } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { useBaseUrl } from "../../hooks/useBaseUrl";

const FormLogin = () => {
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [failedLogin, setFailedLogin] = useState("");
  const usernameRef = useRef();
  const buttonLoginRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (invalidUsername || invalidPassword) return;
    buttonLoginRef.current.disabled = true;
    buttonLoginRef.current.style.cursor = "not-allowed";
    buttonLoginRef.current.style.opacity = "0.5";
    buttonLoginRef.current.style.pointerEvents = "none";
    buttonLoginRef.current.innerText = "Loading...";
    login(
      { username: e.target.username.value, password: e.target.password.value },
      (status, data) => {
        if (status) {
          localStorage.setItem("token", data.token);
          window.location.href = useBaseUrl + "/products";
        } else {
          setFailedLogin(data);
        }
        buttonLoginRef.current.disabled = false;
        buttonLoginRef.current.style.cursor = "pointer";
        buttonLoginRef.current.style.opacity = "1";
        buttonLoginRef.current.style.pointerEvents = "auto";
        buttonLoginRef.current.innerText = "Login";
      }
    );
  };
  const handleChange = (e) => {
    if (e.target.name === "username") setInvalidUsername(e.target.value === "");
    if (e.target.name === "password") setInvalidPassword(e.target.value === "");

    if (failedLogin) setFailedLogin("");
  };
  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="Username"
        type="text"
        placeholder="john_doe"
        name="username"
        onChange={handleChange}
        invalid={invalidUsername}
        ref={usernameRef}
      />
      <InputForm
        label="Password"
        type="password"
        placeholder="******"
        name="password"
        onChange={handleChange}
        invalid={invalidPassword}
      />
      <Button ref={buttonLoginRef} type="submit" classname="bg-blue-600 w-full">
        Login
      </Button>
      {failedLogin && (
        <div className="flex justify-center">
          <span className="text-red-600 text-sm">{failedLogin}</span>
        </div>
      )}
    </form>
  );
};

export default FormLogin;
