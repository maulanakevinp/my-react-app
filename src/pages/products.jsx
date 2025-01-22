import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/Fragments/ProductCard";
import { getProduct } from "../services/product.services";
import TableCart from "../components/Fragments/TableCart";
import { DarkModeContext } from "../context/DarkMode";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const {isDarkMode} = useContext(DarkModeContext);
  
  useEffect(() => {
    document.title = "Products";
  }, []);

  useEffect(() => {
    getProduct((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <>
      <div className={`flex justify-center p-5 ${isDarkMode && "bg-gray-900 text-white"} `}>
        <div className="w-full flex flex-wrap">
          {products.length > 0 && products.map((product) => (
            <ProductCard key={product.id}>
              <ProductCard.Header image={product.image} id={product.id} />
              <ProductCard.Body title={product.title}>
                {product.description}
              </ProductCard.Body>
              <ProductCard.Footer
                price={product.price*15000}
                id={product.id}
              />
            </ProductCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
