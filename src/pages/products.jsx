import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/Fragments/ProductCard";
import { getProduct } from "../services/product.services";
import TableCart from "../components/Fragments/TableCart";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

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
      <div className="flex justify-center p-5">
        <div className="w-3/4 flex flex-wrap">
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
        <div className="w-1/4">
          <h1 className="text-3xl font-bold mb-2 text-blue-600">Cart</h1>
          <TableCart products={products}/>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
