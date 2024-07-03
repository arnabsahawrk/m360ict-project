import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Spin,
  message,
  Tooltip,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Category, Product } from "../../types/types";
import TextArea from "antd/es/input/TextArea";
import {
  useGetProductsCategoryQuery,
  useUpdateProductMutation,
} from "../../features/api/productsApiSlice";
import type { FormProps } from "antd";

interface UpdateProductModalProps {
  product: Product;
}

interface queryCategory {
  data: Category[];
  isLoading: boolean;
}

type FieldType = {
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  warrantyInformation: string;
  thumbnail: string;
};

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ product }) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetProductsCategoryQuery<queryCategory>();
  const [updateProduct, { isLoading: isUpdating, data: result }] =
    useUpdateProductMutation();

  //after updating the product data
  if (result) console.log("Updated Product Data: ", result);

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
  } = product;

  //create select field
  const selectOptions =
    data?.map((category) => ({
      value: category.slug,
      label: category.name,
    })) || [];

  // Form Submit
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const inputValues = {
      title: values.title,
      description: values.description,
      category: values.category,
      price: parseInt(values.price.toString(), 10),
      rating: parseInt(values.rating.toString(), 10),
      stock: parseInt(values.stock.toString(), 10),
      brand: values.brand,
      warrantyInformation: values.warrantyInformation,
      thumbnail: values.thumbnail,
    };

    try {
      await updateProduct({ id: product.id, updateData: inputValues });
      message.success("Product updated successfully!");
      setOpen(false);
    } catch (error) {
      message.error("Failed to update product. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip title="Update Product">
        <Button
          onClick={() => setOpen(true)}
          type="primary"
          shape="round"
          icon={<EditOutlined />}
          size="middle"
        >
          Edit
        </Button>
      </Tooltip>

      <Modal
        title="Update Product"
        open={open}
        onCancel={() => setOpen(false)}
        footer=""
        loading={isLoading}
      >
        <Form onFinish={onFinish}>
          {/* Thumbnail  */}
          <Form.Item
            label="Thumbnail Url"
            name="thumbnail"
            initialValue={thumbnail}
            rules={[{ required: true, message: "Thumbnail Url Is Required" }]}
          >
            <Input placeholder="Product Thumbnail Url" type="url" />
          </Form.Item>
          {/* title  */}
          <Form.Item
            label="Title"
            name="title"
            initialValue={title}
            rules={[{ required: true, message: "Title Is Required" }]}
          >
            <Input placeholder="Product Title" />
          </Form.Item>
          {/* description */}
          <Form.Item
            label="Description"
            name="description"
            initialValue={description}
            rules={[{ required: true, message: "Description Is Required" }]}
          >
            <TextArea rows={4} placeholder="Product Description" />
          </Form.Item>
          {/* category  */}
          <Form.Item label="Category" name="category" initialValue={category}>
            <Select options={selectOptions} />
          </Form.Item>
          {/* brand  */}
          <Form.Item label="Brand" name="brand" initialValue={brand}>
            <Input placeholder="Product Brand" />
          </Form.Item>
          {/* Price  */}
          <Form.Item
            label="Price"
            name="price"
            initialValue={price}
            rules={[{ required: true, message: "Price Is Required" }]}
          >
            <Input placeholder="Product Price" type="number" />
          </Form.Item>
          {/* Stock  */}
          <Form.Item
            label="Stock"
            name="stock"
            initialValue={stock}
            rules={[{ required: true, message: "Stock Is Required" }]}
          >
            <Input placeholder="Product Stock" type="number" />
          </Form.Item>
          {/* Rating  */}
          <Form.Item
            label="Rating"
            name="rating"
            initialValue={rating}
            rules={[{ required: true, message: "Rating Is Required" }]}
          >
            <Input
              placeholder="Product Rating"
              type="number"
              min={1}
              max={5}
              step="0.01"
            />
          </Form.Item>
          {/* Warranty  */}
          <Form.Item
            label="Warranty"
            name="warrantyInformation"
            initialValue={warrantyInformation}
            rules={[
              { required: true, message: "Warranty Information Is Required" },
            ]}
          >
            <Input placeholder="Product Warranty" />
          </Form.Item>
          {/* Submit  */}
          <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
            <Button disabled={isUpdating} type="primary" htmlType="submit">
              {isUpdating ? <Spin /> : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
