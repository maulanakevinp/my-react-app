import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex">
      <h1 className="mr-5">{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
