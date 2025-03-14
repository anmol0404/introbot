import axios from "axios";
const BASE_URL = "https://kuryana.vercel.app";
// Helper function to handle API calls
const apiCall = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`Error fetching data from API: ${error}`);
    }
};
// Function to search for dramas based on a query
export const searchDramas = async (query) => {
    return apiCall(`/search/q/${query}`);
};
// Function to get detailed info about a specific drama using its mydramalist-slug
export const getDramaInfo = async (slug) => {
    return apiCall(`/id/${slug}`);
};
// Function to get the cast of a specific drama using its mydramalist-slug
export const getDramaCast = async (slug) => {
    return apiCall(`/id/${slug}/cast`);
};
// Function to get reviews of a specific drama using its mydramalist-slug
export const getDramaReviews = async (slug) => {
    // Replace `any` with the appropriate interface if reviews are needed.
    return apiCall(`/id/${slug}/reviews`);
};
// Function to get detailed information about a specific person using their ID
export const getPersonInfo = async (personId) => {
    return apiCall(`/people/${personId}`);
};
// Function to get seasonal dramas based on the year and quarter
export const getSeasonalDramas = async (year, quarter) => {
    return apiCall(`/seasonal/${year}/${quarter}`);
};
// Function to get a specific list based on its ID
export const getList = async (listId) => {
    return apiCall(`/list/${listId}`);
};
// Function to get the dramalist of a specific user based on their user_id
export const getUserDramalist = async (userId) => {
    return apiCall(`/dramalist/${userId}`);
};
