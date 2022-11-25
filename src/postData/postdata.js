import axios from "axios";
import { baseUrl } from "../baseUrl";

export const login = (data) => {
    return axios.post(`${baseUrl}/api/login`, data)
} 

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

export const addBanner = (data, headers) => {
    return axios.post(`${baseUrl}/api/insertBanner`, data, {headers})
} 

export const addPromoCode = (data, headers) => {
    return axios.post(`${baseUrl}/api/insertBanner`, data, {headers})
} 

export const addFooter = (data, headers) => {
    return axios.post(`${baseUrl}/api/addFooter`, data, {headers})
} 

export const addMenu = (data, headers) => {
    return axios.post(`${baseUrl}/api/addMenu`, data, {headers})
} 

export const editCategory = (data, headers) => {
    return axios.put(`${baseUrl}/api/updateCategory/`, data, { headers })
} 

export const editSubCategory = (data, headers) => {
    return axios.put(`${baseUrl}/api/updateSubCategory`, data, { headers })
} 

export const editProduct = (formdata, headers) => {
    return axios.put(`${baseUrl}/api/editProduct`, formdata, { headers })
} 

export const editUser = (data, headers) => {
    return axios.put(`${baseUrl}/api/updateProfile`, data, { headers })
} 

export const editBanner = (data, headers) => {
    return axios.put(`${baseUrl}/api/updateBanner`, data, { headers })
} 

export const editPromocode = (data, headers) => {
    return axios.put(`${baseUrl}/api/updateBanner`, data, { headers })
} 

export const editFooter = (data, headers) => {
    return axios.post(`${baseUrl}/api/editFooter`, data, { headers })
}

export const editMenu = (data, headers) => {
    return axios.post(`${baseUrl}/api/editFooter`, data, { headers })
}

export const deleteCategory = (data, headers) => {
    return axios.delete(`${baseUrl}/api/deleteCategory/`, {data, headers: headers })
}

export const deleteSubCategory = (data, headers) => {
    return axios.put(`${baseUrl}/api/updateSubCategory/`, data, {headers})
} 

export const deleteProduct = (data, headers) => {
    return axios.delete(`${baseUrl}/api/deleteProduct/`, {data, headers: headers })
}

export const deleteUser = (data, headers) => {
    return axios.delete(`${baseUrl}/api/deleteUser/`, {data, headers: headers })
}

export const deleteBanner = (data, headers) => {
    return axios.delete(`${baseUrl}/api/deleteBanner/`, {data, headers: headers })
}

export const deletePromoCode = (data, headers) => {
    return axios.delete(`${baseUrl}/api/deleteBanner/`, {data, headers: headers })
}

export const deleteFooter = (data, headers) => {
    return axios.delete(`${baseUrl}/api/deleteFooter/`, {data, headers: headers })
}

export const deleteMenu = (data, headers) => {
    return axios.delete(`${baseUrl}/api/deleteFooter/`, {data, headers: headers })
}