import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/auth",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // AUTHENTICATION ENDPOINTS
    getHome: builder.query({
      query: () => ({
        url: "/home",
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (obj) => ({
        url: "/register",
        method: "POST",
        body: obj,
      }),
    }),
    login: builder.mutation({
      query: (login) => ({
        url: "/login",
        method: "POST",
        body: login,
      }),
    }),

    // USER ENDPOINTS
    getProfile: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),

    // TODO ENDPOINTS
    getTodos: builder.query({
      query: (id) => ({
        url: `/user/${id}/todos`,
        method: "GET",
      }),
    }),
    deleteTodo: builder.query({
      query: (obj) => ({
        url: `/user/${obj.userid}/${obj.todoid}`,
        method: "DELETE",
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ userid, todoid, todo }) => ({
        url: `/user/${userid}/${todoid}/edit`,
        method: "PUT",
        body: todo,
      }),
    }),
    addTodo: builder.mutation({
      query: ({ userid, todo }) => ({
        url: `/user/add/${userid}`,
        method: "POST",
        body: todo,
      }),
    }),
    changeStatusoftodo: builder.mutation({
      query: ({ userid, taskid, completed }) => ({
        url: `/user/${userid}/${taskid}/status?isComplete=${completed}`,
        method: "PUT",
      }),
    }),

    //ADMIN URLS
    getUsers: builder.query({
      query: () => ({
        url: `/admin/all`,
        method: "GET",
      }),
    }),
    deleteUser: builder.query({
      query: (userid) => ({
        url: `/admin/delete/${userid}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetHomeQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useLazyGetTodosQuery,
  useLazyDeleteTodoQuery,
  useUpdateTodoMutation,
  useAddTodoMutation,
  useGetTodosQuery,
  useGetUsersQuery,
  useLazyDeleteUserQuery,
  useChangeStatusoftodoMutation
} = authApi;
