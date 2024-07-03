import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../features/api/productsApiSlice";
import { Skeleton } from "antd";
import Container from "../components/common/Container";
import ProductDetailsComponent from "../components/ProductDetailsComponent";
import { Product } from "../types/types";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateProductModal from "../components/modals/UpdateProductModal";

interface queryProduct {
  data: Product;
  isLoading: boolean;
}

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductDetailsQuery<queryProduct>(id || "");
  //Cart Count from local storage
  const [cartCount, setCartCount] = useState<string>(
    localStorage.getItem("cartCount") || "0"
  );

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} active />
        ))}
      </>
    );
  }
  return (
    <section>
      <nav className="p-4 bg-slate-200 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">M360ICT</Link>
        </h1>
        <Link
          className="hover:text-blue-600 tracking-widest font-medium"
          to="/"
        >
          Home
        </Link>
        {/* Edit and Cart Button  */}
        <div className="flex gap-2 items-center">
          {/* Update Modal  */}
          <UpdateProductModal product={data} />
          {/* Cart  */}
          <p className="text-xl space-x-1">
            <ShoppingCartOutlined />
            <sup>{parseInt(cartCount, 10)}</sup>
          </p>
        </div>
      </nav>
      {/* Details Component */}
      <Container>
        <ProductDetailsComponent product={data} setCartCount={setCartCount} />
      </Container>
    </section>
  );
};

export default ProductDetailsPage;
