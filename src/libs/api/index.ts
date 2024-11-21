import axios from "axios"

import {subId} from "@/libs/users"

export const apiGet = async (endpoint: string) => {
    return axios.get(`https://api.thecatapi.com/v1/${endpoint}&sub-id=${subId}`, {
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || "",
            "Content-Type": "application/json",
        },
    })
}

export const apiPost = async (endpoint: string, body: FormData | string, contentType = "application/json") => {
    return axios.post(`https://api.thecatapi.com/v1/${endpoint}`, body, {
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || "",
            "Content-Type": contentType,
        },
    })
}
