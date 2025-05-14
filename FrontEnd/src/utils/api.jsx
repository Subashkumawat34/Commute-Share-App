// src/utils/api.js

import axios from "axios";

const API_URL = "http://localhost:5000/api"; // HARDCODED URL (For Now)

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    }); // Backend to work
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      // Backend to work
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestRide = async (requestData) => {
  try {
    const response = await axios.post(
      `${API_URL}/ride-requests`, // Backend to work
      requestData,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const offerRide = async (offerData) => {
  try {
    const response = await axios.post(
      `${API_URL}/ride-requests`, // Backend to work
      offerData,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRideMatches = async () => {
  try {
    const response = await axios.get(`${API_URL}/ride-requests/matches`, {
      // Backend to work
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/users/profile`, {
      // Backend to work
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
