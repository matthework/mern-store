const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const apiFetch = (endpoint, options = {}) => {
  return fetch(`${baseURL}${endpoint}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};

export default apiFetch;
