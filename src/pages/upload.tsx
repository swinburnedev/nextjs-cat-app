import Layout from "@/components/layout"

const Upload = () => {
    const handleUpload = () => {
        const fileInput = document.querySelector('input[type="file"]')
        // @ts-expect-error Property 'files' does not exist on type 'Element'
        const file = fileInput.files[0]
        const formData = new FormData()
        formData.append("file", file)

        fetch("https://api.thecatapi.com/v1/images/upload", {
            method: "POST",
            body: formData,
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || "",
            },
        })
    }
    return (
        <Layout title="Upload">
            <form onSubmit={handleUpload}>
                <input type="file" accept="image/*" />
                <button type="submit">Upload</button>
            </form>
        </Layout>
    )
}

export default Upload
