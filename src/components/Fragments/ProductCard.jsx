import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkMode";

const ProductCard = ({ children }) => {
  const {isDarkMode} = useContext(DarkModeContext);
  return (
    <div className={`w-full max-w-sm ${isDarkMode ? "bg-gray-800 text-white border border-gray-800" : "bg-white border border-gray-200"}  rounded-lg shadow mx-2 flex flex-col justify-between mb-5`}>
      {children}
    </div>
  );
};

const Header = ({ id, image }) => {
  return (
    <Link to={`/products/${id}`}>
      <img className="rounded-t-lg h-48 w-full object-contain" src={image} alt="" />
    </Link>
  );
};

const Body = ({ children, title }) => {
  const {isDarkMode} = useContext(DarkModeContext);
  return (
    <div className="p-5 h-full">
      <a href="#">
        <h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {title.length > 20 ? title.slice(0, 20) + "..." : title}
        </h5>
      </a>
      <p className={`mb-3 font-normal ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>{children.length > 100 ? children.slice(0, 100) + "..." : children}</p>
    </div>
  );
};

const Footer = ({ price, id }) => {
  const dispatch = useDispatch();
  const {isDarkMode} = useContext(DarkModeContext);
  return (
    <div className="flex justify-between m-5">
      <h3 className={`mb-0 text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>Rp. {Intl.NumberFormat("id-ID").format(price)}</h3>
      <button
        onClick={() => dispatch(addToCart({id, qty:1}))}
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

ProductCard.Header = Header;
ProductCard.Body = Body;
ProductCard.Footer = Footer;

export default ProductCard;
