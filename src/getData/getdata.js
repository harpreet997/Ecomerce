import axios from "axios";
import { baseUrl } from "../baseUrl";

export const getAllProducts = () => {
    return axios.get(`${baseUrl}/api/allProducts`);
}

export const getAllCategory = () => {
    return axios.get(`${baseUrl}/api/allCategory`);
}

export const getAllUsers = (headers) => {
    return axios.get(`${baseUrl}/api/allUsers`, { headers });
}

export const getAllBanner = () => {
    return axios.get(`${baseUrl}/api/getBanner`);
}

export const getAllPromoCode = () => {
    return axios.get(`${baseUrl}/api/listPromoCode`);
}

export const getAllFooter = () => {
    return axios.get(`${baseUrl}/api/listFooter`);
}

export const getAllMenu = () => {
    return axios.get(`${baseUrl}/api/listFooter`);
}
