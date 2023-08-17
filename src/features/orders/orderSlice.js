import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast/CustomToast";
import CustomToastOptions from "../../components/CustomToast/CustomToastOptions";
import {
  showErrorToast,
  showInfoToast,
} from "../../components/CustomToast/CustomNotification";
export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orderList: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 0,
  },
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    updatePaymentProof: (state, action) => {
      state.orderList.push(action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  setOrderList,
  updatePaymentProof,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
} = orderSlice.actions;

export default orderSlice.reducer;

export function fetchOrder(id_user, status, page = 1) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://shopify-be-git-main-nctrnlman.vercel.app/api/orders/order-list?page=${page}&id_user=${id_user}&status=${status}`
      );

      const { orderItems, totalPages, itemsPerPage } = response.data;

      dispatch(setOrderList(orderItems));
      dispatch(setCurrentPage(page));
      dispatch(setTotalPages(totalPages));
      dispatch(setItemsPerPage(itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };
}

export function uploadPaymentOrder(orderId, formData) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");

      const response = await axios.post(
        `https://shopify-be-git-main-nctrnlman.vercel.app/api/orders/upload-payment/${orderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updatePaymentProof(response.data));
      toast(
        <CustomToast type={"success"} message={response.data.message} />,
        CustomToastOptions
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast(
        <CustomToast type="error" message={error.response.data} />,
        CustomToastOptions
      );
    }
  };
}

export function cancelOrder(orderId, id_user, status) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");

      let response = await axios.put(
        `https://shopify-be-git-main-nctrnlman.vercel.app/api/orders/cancel-order/${orderId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchOrder(id_user, status));

      toast(
        <CustomToast type={"success"} message={response.data.message} />,
        CustomToastOptions
      );
    } catch (error) {
      toast(
        <CustomToast type="error" message={error.response.data} />,
        CustomToastOptions
      );
      console.log(error);
    }
  };
}

export function checkUserOrders() {
  return async () => {
    try {
      const response = await axios.get(
        "https://shopify-be-git-main-nctrnlman.vercel.app/api/status-orders/"
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeStatusToPesananDiterima(id_order) {
  return async () => {
    const token = localStorage.getItem("user_token");
    try {
      const response = await axios.post(
        "https://shopify-be-git-main-nctrnlman.vercel.app/api/status-orders/",
        { id_order },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showInfoToast(response.data.message);
    } catch (error) {
      console.log(error);
      showErrorToast(error.response.data.message);
    }
  };
}
