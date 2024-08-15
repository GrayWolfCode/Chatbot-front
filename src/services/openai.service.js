import axios from "axios";
//import { client } from "@gradio/client";
export const getProjects = async (currentPage = 1, filter = {}) => {
  const openai_url = `https://app.customgpt.ai/api/v1/projects?page=${currentPage}`;
  const headers = {
    authorization: "Bearer 3054|RnHVbOPRg3IZR5EWnFotdraPXulztrXzjI4RT8sv",
    accept: "application/json",
    "content-type": "application/json",
  };
  const data = {};
  try {
    const response = await axios.get(openai_url, {
      headers,
    });

    return response.data;
  } catch (error) {
    // Handle errors appropriately (e.g., logging, displaying error messages)
    console.error("Error fetching messages:", error);

    throw error;
  }
};

export const getMessages = async (projectId, convId) => {
  const openai_url = `https://app.customgpt.ai/api/v1/projects/${projectId}/conversations/${convId}/messages?order=asc`;
  const headers = {
    authorization: "Bearer 3054|RnHVbOPRg3IZR5EWnFotdraPXulztrXzjI4RT8sv",
    accept: "application/json",
    "content-type": "application/json",
  };
  const data = {};
  try {
    const response = await axios.get(openai_url, {
      headers,
    });

    return response.data;
  } catch (error) {
    // Handle errors appropriately (e.g., logging, displaying error messages)
    console.error("Error fetching messages:", error);

    throw error;
  }
};

export const createConversation = async (projectId, title) => {
  const openai_url = `https://app.customgpt.ai/api/v1/projects/${projectId}/conversations`;
  const headers = {
    authorization: "Bearer 3054|RnHVbOPRg3IZR5EWnFotdraPXulztrXzjI4RT8sv",
    accept: "application/json",
    "content-type": "application/json",
  };
  const data = {
    name: title,
  };
  try {
    const response = await axios.post(openai_url, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    // Handle errors appropriately (e.g., logging, displaying error messages)
    console.error("Error fetching sessions:", error);
    throw error;
  }
};
export const getResponse = async (prompt) => {

  const openai_url = `https://5dd9-15-204-240-135.ngrok-free.app/process`;
  const headers = {
    "content-type": "application/json",
  };
  
  try {
    const response = await axios.post(openai_url, {
      question: prompt
    });
    return response.data;
  } catch (error) {
    // Handle errors appropriately (e.g., logging, displaying error messages)
    console.error("Error getting response:", error);
    throw error;
  }
};


export const trainDocument = async (document) => {

  const openai_url = `https://5dd9-15-204-240-135.ngrok-free.app/upload`;
  const headers = {
    "content-type": "application/json",
  };
  
  try {
    const response = await axios.post(openai_url, {
      document: document
    });
    return response.data;
  } catch (error) {
    // Handle errors appropriately (e.g., logging, displaying error messages)
    console.error("Error uploading document:", error);
    throw error;
  }
};
