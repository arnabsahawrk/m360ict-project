import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../features/api/productsApiSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductDetailsQuery(id);
  return <div></div>;
};

export default ProductDetailsPage;
