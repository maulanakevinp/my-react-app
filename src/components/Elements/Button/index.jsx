import { forwardRef } from "react";

const Button = forwardRef((props, ref) => {
  const { children = "...", classname = "bg-black", type = "button", onClick } = props;
  return (
    <button
      ref={ref}
      className={`h-10 px-6 font-semibold rounded-md ${classname} text-white`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default Button;
