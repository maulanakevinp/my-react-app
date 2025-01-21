import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type, placeholder, name, onChange, invalid } = props;
  return (
    <>
      <input
        type={type}
        className={`text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder: opacity-80 ${invalid ? "border-red-600" : ""}`}
        placeholder={placeholder}
        name={name}
        id={name}
        onChange={onChange}
        ref={ref}
      />
      <span className="text-red-600 text-sm">{invalid && `${name} is required`}</span>
    </>
  );
});

export default Input;
