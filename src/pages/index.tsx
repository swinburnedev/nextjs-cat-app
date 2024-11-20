import Layout from "@/components/layout"
import ImageCard from "@/components/img-card"
import {useEffect, useState} from "react"

interface CatImage {
    id: string
    url: string
    width: number
    height: number
}

export default function Home() {
    const [catImages, setCatImages] = useState<CatImage[]>([])

    useEffect(() => {
        async function fetchCats() {
            const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
            const data = await response.json()
            setCatImages(data)
        }
        fetchCats()
        // if success, redirect to home page
        // if error, redirect to error page
    }, [])
    return (
        <Layout>
            <div className="container flex flex-wrap">
                {catImages.map(({id, url, width, height}) => {
                    return <ImageCard key={id} id={id} url={url} width={width} height={height} />
                })}
            </div>
        </Layout>
    )
}
