import axios from "axios";
import { API_URL } from "./constant";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// POST - Create Event
export const createEvent = async (userAddress: string, eventData: any) => {
  try {
    const response = await api.post(`/api/create/${userAddress}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// POST - Vote in an Event
export const voteInEvent = async (eventUuid: string, userAddress: string, voteData: any) => {
  try {
    const response = await api.post(`/api/qvote/${eventUuid}/${userAddress}`, voteData);
    return response.data;
  } catch (error) {
    console.error("Error voting:", error);
    throw error;
  }
};

// GET - Fetch All Events
export const fetchAllEvents = async () => {
  try {
    const response = await api.get("https://quadraticvoting.onrender.com/api/allevents");
    return response.data;
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
};

// GET - Fetch Event Details
export const fetchEventDetails = async (eventUuid: string) => {
  try {
    console.log("url", API_URL + `/api/details/${eventUuid}`);
    const response = await api.get(`/api/details/${eventUuid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};

// GET - Calculate Votes for an Event
export const calculateVotes = async (eventUuid: string) => {
  try {
    const response = await api.get(`/api/calculate-votes/${eventUuid}`);
    return response.data;
  } catch (error) {
    console.error("Error calculating votes:", error);
    throw error;
  }
};

// GET - Fetch Voter Details
export const fetchVoterDetails = async (userAddress: string) => {
  try {
    const response = await api.get(`/api/voterdetails/${userAddress}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching voter details:", error);
    throw error;
  }
};

// DELETE - Delete Event
export const deleteEvent = async (eventUuid: string, userAddress: string) => {
  try {
    const response = await api.delete(`/api/delete/${eventUuid}/${userAddress}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};