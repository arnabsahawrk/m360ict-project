import { Table, Button } from "antd";
import { useGetProductsQuery } from "../features/api/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TableComponent = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });
  const navigate = useNavigate();

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Details",
      render: (record: object) => (
        <Button onClick={() => navigate(`/product/${record.id}`)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={data?.products}
      columns={columns}
      rowKey="id"
      loading={isLoading}
      pagination={{
        current: page,
        pageSize: pageSize,
        total: data?.total,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        },
      }}
    />
  );
};

export default TableComponent;
