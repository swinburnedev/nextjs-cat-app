import {ImageUp} from "lucide-react"
import Image from "next/image"
import {useRouter} from "next/router"
import {useState} from "react"

import Layout from "@/components/layout"
import {apiPost} from "@/libs/api"
import {subId} from "@/libs/users"

interface UploadImage {
    url: string
    height: number
    width: number
}

const Upload = () => {
    const router = useRouter()
	const [apiError, setApiError] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<UploadImage | null>(null)

    const handleUpload = async () => {
        setFormSubmitted(true)
        const fileInput = document.querySelector('input[type="file"]')
        // @ts-expect-error Property 'files' does not exist on type 'Element'
        const fileObj = fileInput?.files[0]
        setFile(fileObj)
        const formData = new FormData()
        formData.append("file", fileObj)
        formData.append("sub_id", subId)

        const upload = await apiPost("images/upload", formData, "multipart/form-data").catch(error => {
            console.error(error)
            if (fileObj) setApiError(true)
        })
        if (upload && upload.data) {
            setPreviewImage(upload.data)
            setTimeout(() => {
                router.push("/")
            }, 3000)
        }
    }

    return (
        <Layout title="Upload">
            <h2 className="block font-bold">Upload a cat image</h2>
            <form action={handleUpload} className="flex flex-col gap-6 px-6 lg:px-0">
                <label className="block font-medium" htmlFor="file">
                    File:
                </label>
                {apiError && <p className="text-red-600">Error submitting upload. Please try again.</p>}
                {!apiError && formSubmitted && !file && <p className="text-red-600">Please select a valid file</p>}
                <input
                    type="file"
                    accept="image/*"
                    onChange={() => {
                        setApiError(false)
                        setFormSubmitted(false)
                    }}
                />
                <button
                    type="submit"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center w-fit"
                >
                    <ImageUp className="pr-2" />
                    <span>Upload</span>
                </button>
            </form>
            {previewImage && (
                <div className="flex flex-col gap-1 px-6 lg:px-0">
                    <h2 className="block font-bold">Preview:</h2>
                    <p>Redirecting to home page in 3 seconds...</p>
                    <Image
                        className="mb-6 h-96 w-96 object-cover rounded-lg aspect-square"
                        src={previewImage.url}
                        height={previewImage.height}
                        width={previewImage.width}
                        alt="Preview"
                    />
                </div>
            )}
        </Layout>
    )
}

export default Upload
