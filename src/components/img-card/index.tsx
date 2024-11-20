import {Heart, ArrowUp, ArrowDown} from "lucide-react"
import Image from "next/image"
import {useState} from "react"

interface ImageCardProps {
    id: string
    height: number
    url: string
    width: number
}

const apiPost = async (endpoint: string, body: string) => {
    return await fetch(`https://api.thecatapi.com/v1/${endpoint}`, {
        method: "POST",
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || "",
            "Content-Type": "application/json",
        },
        body,
    })
}

const ImageCard = ({id, url, width, height}: ImageCardProps) => {
    const [favourite, setFavourite] = useState(false)
    const [score, setScore] = useState(0)
    const handleFavourite = async () => {
        const body = JSON.stringify({
            image_id: id,
        })
        try {
            await apiPost("favourites", body).then(response => {
                if (response.ok) {
                    setFavourite(!favourite)
                } else {
                    throw new Error(`Failed to set favourite ${id}`)
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
    const handleVote = async (value: number) => {
        const body = JSON.stringify({
            image_id: id,
            value: value,
        })
        try {
            const vote = await apiPost("votes", body).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Failed to set score ${id}`)
                }
            })
            setScore(vote.value)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="mb-4 px-2 relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Image src={url} alt={id} className="w-96 h-96 object-cover rounded-lg" width={width} height={height} />
            <span className="absolute bottom-2 w-full flex justify-between">
                {score}
                <button onClick={() => handleVote(score + 1)} title="Vote up">
                    <ArrowUp className="drop-shadow-lg" />
                    <span className="sr-only">Vote up</span>
                </button>
                <button onClick={() => handleVote(score - 1)} title="Vote down">
                    <ArrowDown className="drop-shadow-lg" />
                    <span className="sr-only">Vote down</span>
                </button>
                <button onClick={() => handleFavourite()} title={`${favourite ? "Unfavourite" : "Favourite"} ${id}`}>
                    <Heart
                        className="drop-shadow-lg"
                        fill={`${favourite ? "red" : "none"}`}
                        stroke={`${favourite ? "red" : "white"}`}
                    />
                    <span className="sr-only">{favourite ? "Unfavourite" : "Favourite"}</span>
                </button>
            </span>
        </div>
    )
}

export default ImageCard
