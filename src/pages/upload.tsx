import {ImageUp} from "lucide-react"
import Image from "next/image"
import {useRouter} from "next/router"
import {useState} from "react"

import Layout from "@/components/layout"

interface UploadImage {
    url: string
    height: number
    width: number
}

const Upload = () => {
    const router = useRouter()
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

        const upload = await fetch("https://api.thecatapi.com/v1/images/upload", {
            method: "POST",
            body: formData,
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || "",
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Failed to upload image")
                }
            })
            .catch(error => {
                console.error(error)
            })

        if (upload) {
            setPreviewImage(upload)
            setTimeout(() => {
                router.push("/")
            }, 3000)
        }
    }

    return (
        <Layout title="Upload">
            <h2 className="block font-bold">Upload a cat image</h2>
            <form action={handleUpload}>
                <label className="block font-medium" htmlFor="file">
                    File:
                </label>
                {formSubmitted && !file && <p className="text-red-600">Please select a valid file</p>}
                <input type="file" accept="image/*" onChange={() => setFormSubmitted(false)} />
                <button
                    type="submit"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                >
                    <ImageUp className="pr-2" />
                    <span>Upload</span>
                </button>
            </form>
            {previewImage && (
                <>
                    <h2 className="block font-bold">Preview:</h2>
                    <p>Redirecting to home page in 3 seconds...</p>
                    <Image
                        src={previewImage.url}
                        height={previewImage.height}
                        width={previewImage.width}
                        alt="Preview"
                    />
                </>
            )}
        </Layout>
    )
}

export default Upload
