import React from "react";
import { Product } from "../types/types";
import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider, Image, Space } from "antd";
import ReactStarsRating from "react-awesome-stars-rating";
import { ShoppingCartOutlined } from "@ant-design/icons";
import DeleteReviewModal from "./modals/DeleteReviewModal";

const colors1 = ["#6253E1", "#04BEFE"];
const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

interface ProductDetailsComponent {
  product: Product;
  setCartCount: React.Dispatch<React.SetStateAction<string>>;
}
const ProductDetailsComponent: React.FC<ProductDetailsComponent> = ({
  product,
  setCartCount,
}) => {
  const {
    title,
    description,
    category,
    price,
    rating,
    stock,
    brand,
    warrantyInformation,
    thumbnail,
    reviews,
  } = product;

  //cart item increasing
  const handleAddToCart = () => {
    let cartCount = localStorage.getItem("cartCount");
    if (cartCount) {
      cartCount = (parseInt(cartCount, 10) + 1).toString();
    } else {
      cartCount = "1";
    }
    localStorage.setItem("cartCount", cartCount);
    setCartCount(cartCount);
  };

  return (
    <div className="pb-10">
      <div className="flex flex-col lg:flex-row gap-4 py-10">
        <Image width={384} height={384} src={thumbnail} alt={title} />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="italic">{description}</p>
          {/* Brand and category Button  */}
          <Space>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(90deg,  ${colors2.join(
                      ", "
                    )})`,
                    colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                      colors2
                    ).join(", ")})`,
                    colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                      colors2
                    ).join(", ")})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button type="primary" size="small">
                {category}
              </Button>
            </ConfigProvider>
            {brand && (
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(135deg, ${colors1.join(
                        ", "
                      )})`,
                      colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                        colors1
                      ).join(", ")})`,
                      colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                        colors1
                      ).join(", ")})`,
                      lineWidth: 0,
                    },
                  },
                }}
              >
                <Button type="primary" size="small">
                  {brand}
                </Button>
              </ConfigProvider>
            )}
          </Space>
          {/* Price, Rating, Stock  */}
          <div className="font-bold text-xl">
            <p>Price: ${price}</p>
            <p>Stock: {stock}</p>
            <ReactStarsRating
              isEdit={false}
              isHalf={true}
              size={18}
              className="flex gap-1"
              value={rating}
            />
          </div>
          <div className="flex flex-col gap-5 w-fit">
            {/* Warranty Information  */}
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                      ", "
                    )})`,
                    colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                      colors3
                    ).join(", ")})`,
                    colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                      colors3
                    ).join(", ")})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button type="primary" size="small">
                {warrantyInformation}
              </Button>
            </ConfigProvider>
            {/* Add to Cart  */}
            <Button
              onClick={handleAddToCart}
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              ghost
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
      {/* Review component  */}
      <p className="font-bold underline text-xl mb-5 text-center">Reviews</p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border border-blue-300 w-full max-w-md bg-white rounded-lg shadow-lg p-4 md:p-4 relative"
          >
            <h1 className="text-xl font-bold text-gray-800">
              {review.reviewerName}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{review.reviewerEmail}</p>
            <p className="text-lg font-bold text-gray-700">{review.comment}</p>
            <div className="flex justify-between mt-3 item-center">
              <ReactStarsRating
                isEdit={false}
                isHalf={true}
                size={18}
                className="flex gap-1"
                value={review.rating}
              />
              <p className="text-sm font-bold text-gray-700">
                {new Date(review.date).toLocaleString()}
              </p>
            </div>
            {/* Delete Review Modal  */}
            <div className="absolute top-0 right-0 -translate-y-4 translate-x-2">
              <DeleteReviewModal
                reviews={reviews}
                index={index}
                id={product.id}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
