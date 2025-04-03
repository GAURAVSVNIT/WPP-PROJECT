// src/services/api.js

/**
 * Helper function to handle API responses.
 */
async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "API Error");
    }
    return data;
  }
  
  /**
   * Registers a new user.
   * @param {Object} userData - { firstName, lastName, email, password, confirmpassword }
   * @returns {Object} - Registration response data.
   */
  export async function registerUser(userData) {
    const response = await fetch("/api/auth/registerUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  }
  
  /**
   * Logs in a user.
   * @param {Object} credentials - { email, password }
   * @returns {Object} - Login response data (accessToken, refreshToken, userType).
   */
  export async function loginUser(credentials) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  }
  
  /**
   * Sends a password reset email.
   * @param {string} email - The user's email address.
   * @returns {Object} - Response data.
   */
  export async function forgotPassword(email) {
    const response = await fetch("/api/auth/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  }
  
  /**
   * Changes the user's password.
   * @param {Object} data - { idToken, newPassword }
   * @returns {Object} - Response data.
   */
  export async function changePassword(data) {
    const response = await fetch("/api/auth/changePassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }
  