export const handleResponse = (response) => {
    try {
      console.log("🚀 ~ handleResponse ~ response:", response);
      if (response.status >= 200 && response.status < 300) {
        return { data: response.data, message: response.data.message };
      } else {
        return { error: response.message };
      }
    } catch (error) {
      return { error: error };
    }
  };