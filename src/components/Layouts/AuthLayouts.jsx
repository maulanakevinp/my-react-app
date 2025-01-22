import { Link } from "react-router-dom";
import FormLogin from "../Fragments/FormLogin";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkMode";
import ToggleDarkMode from "../Elements/Button/ToggleDarkMode";

const AuthLayouts = ({ children, title, type }) => {
  const {isDarkMode} = useContext(DarkModeContext);
  return (
    <div className={`flex justify-center min-h-screen items-center flex-col ${isDarkMode && "bg-gray-900 text-white"}`}>
      <ToggleDarkMode />
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
        <p className={`font-medium ${isDarkMode ? "text-white" : "text-slate-500"} mb-8`}>
          Welcome, Please enter your details
        </p>
        {children}
        <p className="text-sm mt-5 text-center">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <Link
            to={type === "login" ? "/register" : "/login"}
            className="text-blue-600 font-semibold"
          >
            {type === "login" ? "Register" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayouts;
