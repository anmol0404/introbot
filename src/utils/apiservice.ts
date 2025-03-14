import axios from "axios";

const BASE_URL = "https://kuryana.vercel.app";

// Helper function to handle API calls
const apiCall = async (endpoint: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from API: ${error}`);
  }
};

// Interface for searching dramas
export interface DramaSearchResult {
  dramas: Drama[];
  people: Person[];
}
export interface Result {
  results: DramaSearchResult;
}

export interface Drama {
  slug: string;
  thumb: string;
  mdl_id: string;
  title: string;
  ranking: string;
  type: string;
  year: number;
  series: string;
}

export interface Person {
  slug: string;
  thumb: string;
  name: string;
  nationality: string;
}

// Interface for drama info
export interface DramaInfo {
  link: string;
  title: string;
  complete_title: string;
  rating: number;
  poster: string;
  synopsis: string;
  casts: Cast[];
  details: DramaDetails;
  others: AdditionalInfo;
}
export interface DramaData {
  data: DramaInfo;
}

export interface Cast {
  name: string;
  profile_image: string;
  slug: string;
  link: string;
}

export interface DramaDetails {
  country: string;
  type: string;
  episodes: string;
  aired: string;
  aired_on: string;
  release_date?: string;
  original_network: string;
  duration: string;
  score: string;
  ranked: string;
  popularity: string;
  content_rating: string;
  watchers: string;
  favorites: string;
}

export interface AdditionalInfo {
  native_title: string[];
  related_content?: string[];
  also_known_as: string[];
  screenwriter: string[];
  director: string[];
  genres: string[];
  tags: string[];
}

// Interface for seasonal dramas
export interface SeasonalDrama {
  year: number;
  quarter: number;
  dramas: Drama[];
}

// Interface for a list of dramas (e.g., favorites or recommendations)
export interface List {
  id: string;
  title: string;
  dramas: Drama[];
}

// Interface for a user's dramalist
export interface UserDramalist {
  user_id: string;
  list: Drama[];
}

// Function to search for dramas based on a query
export const searchDramas = async (query: string): Promise<Result> => {
  return apiCall(`/search/q/${query}`);
};

// Function to get detailed info about a specific drama using its mydramalist-slug
export const getDramaInfo = async (slug: string): Promise<DramaData> => {
  return apiCall(`/id/${slug}`);
};

// Function to get the cast of a specific drama using its mydramalist-slug
export const getDramaCast = async (slug: string): Promise<Cast[]> => {
  return apiCall(`/id/${slug}/cast`);
};

// Function to get reviews of a specific drama using its mydramalist-slug
export const getDramaReviews = async (slug: string): Promise<any> => {
  // Replace `any` with the appropriate interface if reviews are needed.
  return apiCall(`/id/${slug}/reviews`);
};

// Function to get detailed information about a specific person using their ID
export const getPersonInfo = async (personId: string): Promise<Person> => {
  return apiCall(`/people/${personId}`);
};

// Function to get seasonal dramas based on the year and quarter
export const getSeasonalDramas = async (year: number, quarter: number): Promise<SeasonalDrama> => {
  return apiCall(`/seasonal/${year}/${quarter}`);
};

// Function to get a specific list based on its ID
export const getList = async (listId: string): Promise<List> => {
  return apiCall(`/list/${listId}`);
};

// Function to get the dramalist of a specific user based on their user_id
export const getUserDramalist = async (userId: string): Promise<UserDramalist> => {
  return apiCall(`/dramalist/${userId}`);
};
