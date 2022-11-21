import axios from "axios";
import { baseUrl } from "../baseUrl";

export const getAllProducts = () => {
        return axios.get(`${baseUrl}/api/allProducts`);
    }

export const getAllCategory = () => {
        return axios.get(`${baseUrl}/api/allCategory`);
    }

export const getAllUsers = (headers) => {
        return axios.get(`${baseUrl}/api/allUsers`, {headers});
    }
