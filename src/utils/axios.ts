// axios.ts
import axios from 'axios';
import { Order, Specimen, SourceDescription, Patient, Location, OtherDetails, Record } from '../types/api'; // Adjust imports as needed
import { BASE_URL, API_PATH } from './appRoutes';
import { getToken } from './auth';

// Create an instance of axios with base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to headers if available
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    console.log("Token found:", token);  // Debugging log
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.warn("No token found, request might be unauthorized.");
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor to handle responses and errors
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    console.error("Unauthorized: Token may be invalid or expired.");
    // Optionally, redirect to login or attempt to refresh the token here
  }
  return Promise.reject(error);
});
// Fetch Orders
export const fetchOrders = async (): Promise<Order[]> => {
  const response = await api.get(API_PATH.ORDERS);
  return response.data;
};

// Fetch Specimens
export const fetchSpecimens = async (): Promise<Specimen[]> => {
  const response = await api.get(API_PATH.SPECIMENS);
  return response.data;
};

// Fetch Source Descriptions
export const fetchSourceDescriptions = async (): Promise<SourceDescription[]> => {
  const response = await api.get(API_PATH.SOURCE_DESCRIPTIONS);
  return response.data;
};

// Fetch Patients
export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await api.get(API_PATH.PATIENTS);
  return response.data;
};

// Fetch Locations
export const fetchLocations = async (): Promise<Location[]> => {
  const response = await api.get(API_PATH.LOCATIONS);
  return response.data;
};

// Fetch Other Details
export const fetchOtherDetails = async (): Promise<OtherDetails[]> => {
  const response = await api.get(API_PATH.OTHER_DETAILS);
  return response.data;
};

// Fetch Records
export const fetchRecords = async (): Promise<Record[]> => {
  const response = await api.get(API_PATH.RECORD);
  return response.data;
};

// Post data to a specified endpoint
export const postData = async (endpoint: string, data: any) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

// Example function for posting an order (adjust if you have specific requirements)
export const postOrder = async (order: Order) => {
  const response = await api.post(API_PATH.ORDERS, order);
  return response.data;
};

// Post Record
export const postRecord = async (record: Record) => {
  const response = await api.post(API_PATH.RECORD, record);
  return response.data;
};

export default api;
