import axios from "axios";
import { baseUrl } from "../baseUrl";

export const addCategory = (categorydata, headers) => {
    return axios.post(`${baseUrl}/api/addCategory`, categorydata, { headers }
    )
} 

export const addSubCategory = (data, headers) => {
    return axios.put('http://localhost:3500/api/updateSubCategory', data, { headers }
    )
} 