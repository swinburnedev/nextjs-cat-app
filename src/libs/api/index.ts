import {subId} from "@/libs/users"

export const apiGet = async (endpoint: string) => {
    return await fetch(`https://api.thecatapi.com/v1/${endpoint}&sub-id=${subId}`, {
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || "",
            "Content-Type": "application/json",
        },
    })
}

export const apiPost = async (endpoint: string, body: FormData | string, contentType = "application/json") => {
    return await fetch(`https://api.thecatapi.com/v1/${endpoint}`, {
        method: "POST",
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || "",
            "Content-Type": contentType,
        },
        body,
    })
}
