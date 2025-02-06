"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getProduct } from "../../services/product.services";
import { useDispatch, useSelector } from "react-redux";
import { useTotalPrice, useTotalPriceDispatch } from "../../context/TotalPriceContext";
import { addToCart, decreaseQuantity } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

export default function ShoppingCart({ open = false, setOpen }) {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart.data);
  const { total } = useTotalPrice();
  const dispatch = useDispatch();
  const dispatchTotalPrice = useTotalPriceDispatch();


  useEffect(() => {
    getProduct((data) => {
      setProducts(data);
    });
  }, []);

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
      } else {
        dispatchTotalPrice({
          type: "UPDATE",
          payload: {
            total: 0,
          },
        })
        localStorage.removeItem("cart");
      }
    }
  }, [cart, products]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {products.length > 0 &&
                          cart.map((item) => {
                            const product = products.find(
                              (p) => p.id === item.id
                            );
                            return (
                              <li key={product.id} className="flex py-6">
                                <a href={`/products/${product.id}`} className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    alt={product.title}
                                    src={product.image}
                                    className="size-full object-cover"
                                  />
                                </a>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a
                                          href={`/products/${product.id}`}
                                          className="text-sm font-medium text-gray-700"
                                        >
                                          {product.title.length > 35
                                            ? product.title.slice(0, 35) + "..."
                                            : product.title}
                                        </a>
                                      </h3>
                                      <p className="ml-4">
                                        {new Intl.NumberFormat("id-ID", {
                                          style: "currency",
                                          currency: "IDR",
                                        }).format(product.price * 15000)}
                                      </p>
                                    </div>
                                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {item.qty}
                                    </p>
                                    <div className="">
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => dispatch(addToCart({ id: product.id }))}
                                        >
                                          ➕
                                        </button>
                                      </div>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => dispatch(decreaseQuantity({ id: product.id }))}
                                        >
                                          ➖
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(total)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
