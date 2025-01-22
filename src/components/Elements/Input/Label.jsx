import { useContext } from "react";
import { DarkModeContext } from "../../../context/DarkMode";

const Label = ({ htmlFor, children }) => {
  const {isDarkMode, setIsDarkMode} = useContext(DarkModeContext);  
  return (
    <label
      htmlFor={htmlFor}
      className={`block ${isDarkMode ? 'text-white' : 'text-slate-700'} text-sm font-bold mb-2`}
    >
      {children}
    </label>
  );
};

export default Label;
