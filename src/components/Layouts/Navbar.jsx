import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import Button from "../Elements/Button";
import { useSelector } from "react-redux";
import ToggleDarkMode from "../Elements/Button/ToggleDarkMode";
import { useTotalPrice } from "../../context/TotalPriceContext";
import ShoppingCart from "../Fragments/ShoppingCart";

export default function Navbar() {
  const username = useLogin();
  const [isOpen, setIsOpen] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const cart = useSelector((state) => state.cart.data);
  const {total} = useTotalPrice();
  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.qty, 0);
    setTotalCart(sum);
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = import.meta.env.BASE_URL + "/login";
  };

  return (
    <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
      <button onClick={() => setIsOpen(!isOpen)} className="relative mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="absolute top-0 right-0 inline-block w-4 transform translate-x-1/2 -translate-y-1/2 bg-slate-800 text-xs text-center rounded-full">{totalCart}</span>
      </button>
      <span className="mr-5">| {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(total)}</span>
      <ShoppingCart open={isOpen} setOpen={setIsOpen}/>
      {username}
      <Button classname="ml-5 mr-10 bg-black" onClick={handleLogout}>
        Logout
      </Button>
      <ToggleDarkMode/>
    </div>
  );
}
