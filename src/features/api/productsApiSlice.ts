import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ProductsResponse {
  products: [];
  total: number;
  skip: number;
  limit: number;
}

export const productsApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    //all products api
    getProducts: builder.query<
      ProductsResponse,
      { limit: number; skip: number }
    >({
      query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
    }),
    //single products api
    getProductDetails: builder.query<object, void>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
