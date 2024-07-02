import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../features/api/productsApiSlice";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductDetailsQuery(id || "");

  console.log(data, isLoading);
  return <div></div>;
};

export default ProductDetailsPage;
