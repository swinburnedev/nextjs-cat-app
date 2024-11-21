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
    apiError: boolean
    catImages: CatImage[]
}

export default function Home({apiError, catImages}: HomeProps) {
    return (
        <Layout title="Home">
            <div className="container flex flex-wrap">
                {apiError && (
                    <p className="text-red-600 mb-6">Failed to load images. Please reload the page to try again.</p>
                )}
                {catImages.map(({id, url, width, height, score}) => {
                    return <ImageCard key={id} id={id} url={url} width={width} height={height} score={score} />
                })}
            </div>
        </Layout>
    )
}

export const getServerSideProps = async () => {
    let catImages: CatImage[] = []
    try {
        const imagesResponse = await apiGet("images?limit=10&order=DESC").catch(imageError => {
            throw new Error("Failed to load images", {cause: imageError})
        })
        const votesResponse = await apiGet("votes?limit=10&order=DESC").catch(voteError => {
            throw new Error("Failed to load votes", {cause: voteError})
        })

        const images = imagesResponse ? imagesResponse.data : []
        const votes = votesResponse ? votesResponse.data : []

        if (images && votes) {
            catImages = images.map((image: CatImage) => {
                return {
                    id: image.id,
                    url: image.url,
                    width: image.width,
                    height: image.height,
                    score: votes.find((vote: {image_id: string}) => vote.image_id === image.id)?.value || 0,
                }
            })
        }
        return {
            props: {
                apiError: !images && !votes,
                catImages,
            },
        }
    } catch (error) {
        console.error(error)
        return {
            props: {
                apiError: true,
                catImages,
            },
        }
    }
}
