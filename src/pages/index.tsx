import Layout from "@/components/layout"
import ImageCard from "@/components/img-card"
import {apiGet} from "@/libs/api"

interface CatImage {
    id: string
    url: string
    width: number
    height: number
    score: number
}

interface HomeProps {
    catImages: CatImage[]
}

export default function Home({catImages}: HomeProps) {
    return (
        <Layout title="Home">
            <div className="container flex flex-wrap">
                {catImages.map(({id, url, width, height, score}) => {
                    return <ImageCard key={id} id={id} url={url} width={width} height={height} score={score} />
                })}
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    const response = await apiGet("images?limit=10&order=DESC")
    const images = await response.json()

    const votesResponse = await apiGet("votes?limit=10&order=DESC")
    const votes = await votesResponse.json()

    const data = images.map((image: CatImage) => {
        return {
            id: image.id,
            url: image.url,
            width: image.width,
            height: image.height,
            score: votes.find((vote: {image_id: string}) => vote.image_id === image.id)?.value || 0,
        }
    })
    return {
        props: {
            catImages: data,
        },
    }
}
