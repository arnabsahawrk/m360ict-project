import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Product, ProductsResponse } from "../../types/types";

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
    getProductDetails: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
    //products category api
    getProductsCategory: builder.query<Category[], void>({
      query: () => "/products/categories",
    }),
    //product update api
    updateProduct: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductsCategoryQuery,
  useUpdateProductMutation,
} = productsApiSlice;
