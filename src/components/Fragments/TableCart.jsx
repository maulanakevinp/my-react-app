import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../../redux/slices/cartSlice";
import { DarkModeContext } from "../../context/DarkMode";
import { useTotalPrice, useTotalPriceDispatch } from "../../context/TotalPriceContext";

export default function TableCart({ products }) {
  const cart = useSelector((state) => state.cart.data);
  const totalPriceRow = useRef(null);
	const dispatch = useDispatch();
  const {isDarkMode} = useContext(DarkModeContext);
  const dispatchTotalPrice = useTotalPriceDispatch();
  const {total} = useTotalPrice();
  useEffect(() => {
    if (products.length > 0) {
      if (cart.length > 0) {
        const sum = cart.reduce((acc, item) => {
          const product = products.find((product) => product.id === item.id);
          return acc + product.price * 15000 * item.qty;
        }, 0);
        dispatchTotalPrice({
          type: "UPDATE",
          payload: {
            total: sum,
          },
        })
        localStorage.setItem("cart", JSON.stringify(cart));
        totalPriceRow.current.style.display = "table-row";
      } else {
        dispatchTotalPrice({
          type: "UPDATE",
          payload: {
            total: 0,
          },
        })
        totalPriceRow.current.style.display = "none";
        localStorage.removeItem("cart");
      }
    }
  }, [cart, products]);

  return (
    <table className={`w-full text-sm text-left ${isDarkMode ? "text-white" : "text-gray-500"}`}>
      <thead className={`text-xs ${isDarkMode ? "text-white" : "text-gray-700"} uppercase`}>
        <tr>
          <th scope="col" className="py-1">
            Product
          </th>
          <th scope="col" className="py-1 text-end">
            Price
          </th>
          <th scope="col" className="py-1 text-end">
            Qty
          </th>
          <th scope="col" className="py-1 text-end">
            Total
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 &&
          cart.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return (
              <tr key={item.id}>
                <th
                  scope="row"
                  className={`py-1 font-medium ${isDarkMode ? "text-white" : "text-gray-900"} whitespace-nowrap`}
                >
                  {product.title.length > 20
                    ? product.title.slice(0, 20) + "..."
                    : product.title}
                </th>
                <td className="py-1 text-end">
                  {Intl.NumberFormat("id-ID").format(product.price * 15000)}
                </td>
                <td className="py-1 text-end">{item.qty}</td>
                <td className="py-1 text-end">
                  {Intl.NumberFormat("id-ID").format(
                    product.price * 15000 * item.qty
                  )}
                </td>
                <td className="py-1 text-end">
                  <button onClick={() => dispatch(addToCart({id: item.id}))}>
                    ➕
                  </button>
                  <button onClick={() => dispatch(decreaseQuantity({id: item.id}))}>
                    ➖
                  </button>
                </td>
              </tr>
            );
          })}
        <tr ref={totalPriceRow}>
          <td
            colSpan="3"
            className={`py-1 text-end font-medium ${isDarkMode ? "text-white" : "text-gray-900"} whitespace-nowrap`}
          >
            Total Price
          </td>
          <td className="py-1 text-end">
            {Intl.NumberFormat("id-ID").format(total)}
          </td>
          <td className="py-1 text-end"></td>
        </tr>
      </tbody>
    </table>
  );
}
