import React, { useState } from "react";
import { Button, Flex, Form, Input, Modal, Spin, Tooltip, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Review } from "../../types/types";
import { useUpdateProductMutation } from "../../features/api/productsApiSlice";
import type { FormProps } from "antd";

interface AddReviewModalProps {
  reviews: Review[];
  id: number;
}

type Comments = {
  rating: number;
  comment: string;
};

type FieldType = {
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerEmail: string;
  comments: Comments[];
};

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  reviews: allReviews,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const reviewInput = {
      rating: parseInt(values.rating.toString(), 10),
      comment: values.comment,
      date: new Date().toISOString(),
      reviewerName: values.reviewerName,
      reviewerEmail: values.reviewerEmail,
    };

    const addedAllReviews = [...allReviews, reviewInput];

    //more comments
    if (values.comments?.length) {
      const moreComment = values.comments.map((comment) => {
        return {
          reviewerName: reviewInput.reviewerName,
          reviewerEmail: reviewInput.reviewerEmail,
          date: reviewInput.date,
          rating: parseInt(comment.rating.toString(), 10),
          comment: comment.comment,
        };
      });

      addedAllReviews.push(...moreComment);
    }

    try {
      await updateProduct({ id, updateData: { reviews: addedAllReviews } });
      message.success("Review added successfully!");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to add review. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip title="Add Review">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="middle"
          onClick={() => setIsModalOpen(true)}
        />
      </Tooltip>
      <Modal
        title="Add Review"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer=""
      >
        <Form onFinish={onFinish}>
          {/* Name  */}
          <Form.Item
            label="Name"
            name="reviewerName"
            rules={[{ required: true, message: "Name Is Required" }]}
          >
            <Input placeholder="Your Name" />
          </Form.Item>
          {/* Email  */}
          <Form.Item
            label="Email"
            name="reviewerEmail"
            rules={[{ required: true, message: "Email Is Required" }]}
          >
            <Input placeholder="Your Email" type="email" />
          </Form.Item>
          {/* Rating */}
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Rating Is Required" }]}
          >
            <Input
              placeholder="Rating"
              type="number"
              min={1}
              max={5}
              step="0.01"
            />
          </Form.Item>
          {/* Comment */}
          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Comment Is Required" }]}
          >
            <Input placeholder="Your Comment" />
          </Form.Item>
          {/* Dynamic List for Comment and Rating  */}
          <Form.List name="comments">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => {
                  return (
                    <Flex
                      key={field.key}
                      vertical
                      style={{ position: "relative" }}
                    >
                      {/* Dynamic Rating */}
                      <Form.Item
                        label={`Rating-${index + 2}:`}
                        name={[field.name, "rating"]}
                        rules={[
                          { required: true, message: "Rating Is Required" },
                        ]}
                      >
                        <Input
                          placeholder="Rating"
                          type="number"
                          min={1}
                          max={5}
                          step="0.01"
                        />
                      </Form.Item>
                      {/* Dynamic Comment  */}
                      <Form.Item
                        label={`Comment-${index + 2}:`}
                        name={[field.name, "comment"]}
                        rules={[
                          { required: true, message: "Comment Is Required" },
                        ]}
                      >
                        <Input placeholder="Your Comment" />
                      </Form.Item>
                      <Tooltip title="Remove">
                        <MinusCircleOutlined
                          style={{
                            height: 40,
                            color: "red",
                            position: "absolute",
                            bottom: -8,
                            left: 0,
                          }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Tooltip>
                    </Flex>
                  );
                })}
                <Form.Item>
                  {/* Add More Comment Button */}
                  <Button
                    icon={<PlusOutlined />}
                    type="dashed"
                    block
                    onClick={() => add()}
                  >
                    Add More Comment
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          {/* Submit  */}
          <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
            <Button disabled={isLoading} type="primary" htmlType="submit">
              {isLoading ? <Spin /> : "ADD"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddReviewModal;
