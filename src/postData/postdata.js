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

export const addUser = (userdata) => {
    return axios.post(`${baseUrl}/api/signup`, userdata)
} 

export const editCategory = (data, headers, id) => {
    return axios.put(`${baseUrl}/api/allCategory/${id}`, data, { headers })
} 

export const editSubCategory = (data, headers, id) => {
    return axios.put(`${baseUrl}/api/allCategory/${id}`, data, { headers })
} 

export const editProduct = (formdata, headers, id) => {
    return axios.put(`${baseUrl}/api/${id}`, formdata, { headers })
} 

export const deleteCategory = (id, headers) => {
    return axios.delete(`${baseUrl}/api/allCategory/${id}`, { headers })
}

export const deleteSubCategory = (id, headers) => {
    return axios.delete(`${baseUrl}/api/allCategory/${id}`, { headers })
} 

export const deleteProduct = (id, headers) => {
    return axios.delete(`${baseUrl}/api/${id}`, { headers })
}