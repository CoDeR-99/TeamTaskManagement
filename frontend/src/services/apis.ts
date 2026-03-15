import axios from "axios";

const BASE_URL = 'http://localhost:3000'

const axiosClient = axios.create({
    baseURL: BASE_URL
})

// GET
export const getRequest = async (url: string) => {
  return axiosClient
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// POST
export const postRequest = async (url: string, data: unknown) => {
  return axiosClient
    .post(url, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// PUT
export const putRequest = async (url: string, data: unknown) => {
  return axiosClient
    .put(url, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// PATCH
export const patchRequest = async (url: string, data: unknown) => {
  return axiosClient
    .patch(url, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// DELETE
export const deleteRequest = async (url: string) => {
  return axiosClient
    .delete(url, {
      headers: {
        "x-delete-auth": "delete-task",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

