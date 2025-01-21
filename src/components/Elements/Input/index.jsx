import { forwardRef } from "react";
import Input from "./Input";
import Label from "./Label";

const InputForm = forwardRef((props, ref) => {
  const { label, type = "text", placeholder, name, onChange, invalid } = props;
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        invalid={invalid}
        ref={ref}
      />
    </div>
  );
});

export default InputForm;
