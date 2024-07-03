import React, { useState } from "react";
import { Button, Modal, Tooltip, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Review } from "../../types/types";
import { useUpdateProductMutation } from "../../features/api/productsApiSlice";

interface DeleteReviewModalProps {
  reviews: Review[];
  index: number;
  id: number;
}

const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({
  reviews: allReviews,
  index,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleDelete = async () => {
    const remainReview = allReviews.filter((_, idx) => index !== idx);

    try {
      await updateProduct({ id, updateData: { reviews: remainReview } });
      message.success("Review deleted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to delete. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip title="Delete Review">
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          size="large"
          onClick={() => setIsModalOpen(true)}
          danger
        />
      </Tooltip>
      <Modal
        open={isModalOpen}
        onOk={handleDelete}
        okText="Delete"
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isLoading}
      >
        <p className="text-lg text-blue-600">Are You Sure?</p>
      </Modal>
    </>
  );
};

export default DeleteReviewModal;
