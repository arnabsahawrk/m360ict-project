import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../features/api/productsApiSlice";
import { Skeleton } from "antd";
import Container from "../components/common/Container";
import ProductDetailsComponent from "../components/ProductDetailsComponent";
import { Product } from "../types/types";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

interface queryProduct {
  data: Product;
  isLoading: boolean;
}

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductDetailsQuery<queryProduct>(id || "");

  if (isLoading)
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} active />
        ))}
      </>
    );
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
        {/* Edit Button  */}
        <Button
          type="primary"
          shape="round"
          icon={<EditOutlined />}
          size="middle"
        >
          Edit
        </Button>
      </nav>
      {/* Details Component */}
      <Container>
        <ProductDetailsComponent product={data} />
      </Container>
    </section>
  );
};

export default ProductDetailsPage;
