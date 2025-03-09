import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL:
    "https://9358-2405-4802-8132-b860-515c-16f5-676c-488e.ngrok-free.app/api",
=======
  baseURL: "https://9358-2405-4802-8132-b860-515c-16f5-676c-488e.ngrok-free.app/api",
  baseURL: 'https://9358-2405-4802-8132-b860-515c-16f5-676c-488e.ngrok-free.app/api',
>>>>>>> 710d75bb43befc20ae257bed1defaf1e5a9f7379
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Có thể thêm xử lý trước khi gửi request
    // Ví dụ: thêm token authentication
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý response data trước khi trả về
    return response.data;
  },
  (error) => {
    // Xử lý lỗi
    if (error.response) {
      // Lỗi response từ server (status code không phải 2xx)
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      // Không nhận được response
      console.error("Request error:", error.request);
    } else {
      // Lỗi khi setup request
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Thêm API endpoints cho users
export const usersAPI = {
  getAll: () => axiosInstance.get("/users"),
  getById: (id) => axiosInstance.get(`/users/${id}`),
  create: (data) => axiosInstance.post("/users", data),
  update: (id, data) => axiosInstance.put(`/users/${id}`, data),
  delete: (id) => axiosInstance.delete(`/users/${id}`),
};

// Giữ nguyên servicesAPI
export const servicesAPI = {
  getAll: () => axiosInstance.get("/services"),
  getById: (id) => axiosInstance.get(`/services/${id}`),
  create: (data) => axiosInstance.post("/services", data),
  update: (id, data) => axiosInstance.put(`/services/${id}`, data),
  delete: (id) => axiosInstance.delete(`/services/${id}`),
};

export default axiosInstance;
