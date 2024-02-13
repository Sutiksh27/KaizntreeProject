// apiHelper.js
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { User, Category, Tag, Item } from './types';

const API_BASE_URL = 'http://localhost:8000/api/v1/'; // Update with your Django backend URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000, // Adjust as needed
});

// Define types for your API responses
interface ApiResponse {
    success: boolean;
    message: string;
    // Add more fields as needed
}

// Declare inputs for Login
interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    user: {
        id: number,
        username: string,
        email: string
    }
}

const apiHelper = {
// Fetch all categories from the backend
    async getAllCategories(): Promise<Category[]> {
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}categories/`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to initiate password reset");
        }
    },

// Create a new category on the backend
    async createCategory(categoryData: Category): Promise<Category> {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}categories/`, categoryData);
            return response.data;
        } catch (error) {
            throw new Error("Can't create a new Category");
        }
    },

// Fetch all tags from the backend
    async getAllTags(): Promise<Tag[]> {
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}tags/`);
            return response.data;
        } catch (error) {
            throw new Error("Can't retrieve Tags");
        }
    },

// Create a new tag on the backend
    async createTag(tagData: Tag): Promise<Tag> {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}tags/`, tagData);
            return response.data;
        } catch (error) {
            throw new Error("Can't Create a Tag");
        }
    },

// Fetch all items from the backend
    async getAllItems (): Promise<Item[]> {
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}items/`);
            return response.data;
        } catch (error) {
            throw new Error("Can't retrieve Items");
        }
    },

// Create a new item on the backend
    async createItem (itemData: Item): Promise<Item> {
        console.log("Item: ", itemData);
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}items/`, itemData);
            console.log(response);
            return response.data;
        } catch (error) {
            throw new Error("Can't create an Item.");
        }
    },

// Fetch all users from the backend
    async getAllUsers (): Promise<User> {
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}users/`);
            return response.data;
        } catch (error) {
            throw new Error("Can't retrieve Users.");
        }
},


// Create a user in the backend
    async createUser(userData: User): Promise<User> {
        try {
            const response: AxiosResponse<User> = await axiosInstance.post(`${API_BASE_URL}users/create/`, userData);
            console.log("Response: ", response.data)
            return response.data;
        } catch (error) {
            throw new Error("Can't create a User.");
        }
},

// Login the user to the system

    async loginUser (credentials: LoginCredentials): Promise<LoginResponse> {
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(`${API_BASE_URL}login/`, credentials);
            console.log(response.data);
            return response.data;
        } catch (error) {
            // Handle errors or return a default error response
            throw new Error("Login Failed");
        }
    },
    

    async forgotPassword (email: string): Promise<ApiResponse> {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}forgot-password/`, email);
            return response.data;
        } catch (error) {
            throw new Error("Unable to reset password");
        }
},

    async resetPassword (token: string, newPassword: string): Promise<ApiResponse> {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}reset-password/${token}/`, newPassword);
            return response.data;
        } catch (error) {
            throw new Error("Unable to access token!")
        }
},

}

export default apiHelper;
  // Add more API calls as needed
