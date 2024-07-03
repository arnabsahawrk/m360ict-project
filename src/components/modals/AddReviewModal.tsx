import React, { useState } from "react";
import { Button, Flex, Form, Input, Modal, Spin, Tooltip, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Review } from "../../types/types";
import { useUpdateProductMutation } from "../../features/api/productsApiSlice";

interface AddReviewModalProps {
  reviews: Review[];
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ reviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const onFinish = async () => {
    // const remainReview = allReviews.filter((_, idx) => index !== idx);
    // try {
    //   await updateProduct({ id, updateData: { reviews: remainReview } });
    //   message.success("Review deleted successfully!");
    //   setIsModalOpen(false);
    // } catch (error) {
    //   message.error("Failed to delete. Please try again.");
    //   console.log(error);
    // }
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
            <Input placeholder="Your Email" />
          </Form.Item>
          {/* Rating */}
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Rating Is Required" }]}
          >
            <Input placeholder="Rating" type="number" />
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
                        <Input placeholder="Rating" type="number" />
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
