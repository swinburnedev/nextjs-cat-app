import axios from "axios"
import {apiGet, apiPost} from "./index"
import {mock} from "node:test"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("apiGet", () => {
    it("should make a GET request to the correct endpoint with headers", async () => {
        const endpoint = "images/search"
        const subId = "user-swinburne"
        process.env.NEXT_PUBLIC_CAT_API_KEY = "test-api-key"

        mockedAxios.get.mockResolvedValue({data: []})

        const response = await apiGet(endpoint)

        expect(mockedAxios.get).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/${endpoint}&sub-id=${subId}`, {
            headers: {
                "x-api-key": "test-api-key",
                "Content-Type": "application/json",
            },
        })
        expect(response.data).toEqual([])
    })
})

describe("apiPost", () => {
    it("should make a POST request to the correct endpoint with headers and body", async () => {
        const endpoint = "images/upload"
        const body = new FormData()
        const mockedData = {mock: "data"}
        process.env.NEXT_PUBLIC_CAT_API_KEY = "test-api-key"

        mockedAxios.post.mockResolvedValue({data: mockedData})

        const response = await apiPost(endpoint, body)

        expect(mockedAxios.post).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/${endpoint}`, body, {
            headers: {
                "x-api-key": "test-api-key",
                "Content-Type": "application/json",
            },
        })
        expect(response.data).toEqual(mockedData)
    })

    it("should make a POST request with a different content type", async () => {
        const endpoint = "images/upload"
        const contentType = "multipart/form-data"
        const mockFormData = new FormData()
        const subId = "user-swinburne"
        mockFormData.append("sub_id", subId)
        const mockedData = {mock: "data"}
        process.env.NEXT_PUBLIC_CAT_API_KEY = "test-api-key"

        mockedAxios.post.mockResolvedValue({data: mockedData})

        const response = await apiPost(endpoint, mockFormData, contentType)

        expect(mockedAxios.post).toHaveBeenCalledWith(`https://api.thecatapi.com/v1/${endpoint}`, mockFormData, {
            headers: {
                "x-api-key": "test-api-key",
                "Content-Type": contentType,
            },
        })
        expect(response.data).toEqual(mockedData)
    })
})
