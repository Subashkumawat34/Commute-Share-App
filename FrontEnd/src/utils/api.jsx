// src/utils/api.js

const API_BASE_URL = "/api"; // Or your actual API base URL

// Function to handle API requests and errors
async function handleRequest(url, options = {}) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(API_BASE_URL + url, options);

    if (!response.ok) {
      const errorData = await response.json(); // Try to get error message from response
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      //If no JSON is returned, return the response text
      return await response.text();
    }
  } catch (error) {
    console.error("API request error:", error);
    throw error; // Re-throw to be caught by the component
  }
}

// Authentication
export async function registerUser(name, email, password) {
  return handleRequest("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
}

export async function loginUser(email, password) {
  return handleRequest("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

// Profile
export async function getUserProfile() {
  return handleRequest("/profile");
}

// Ride Requests/Offers
export async function requestRide(data) {
  return handleRequest("/ride-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function offerRide(data) {
  return handleRequest("/ride-offers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Matches
export async function getRideMatches() {
  return handleRequest("/matches");
}

// Geocoding (Example - Adapt to your chosen service)
export async function geocodeLocation(query) {
  return handleRequest(`/geocode?query=${query}`);
}
