import axios from "axios";
import { baseUrl } from "../baseUrl";

export const addCategory = (categorydata, headers) => {
    return axios.post(`${baseUrl}/api/addCategory`, categorydata, { headers })
} 

export const addSubCategory = (data, headers) => {
    return axios.put(`${baseUrl}/api/updateSubCategory`, data, { headers })
} 

export const addProduct = (formdata, headers) => {
    return axios.post(`${baseUrl}/api/addProduct`, formdata, { headers })
} 