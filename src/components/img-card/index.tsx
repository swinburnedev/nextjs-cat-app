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
            <div className="flex flex-col gap-1">
                <Image
                    src={url}
                    alt={id}
                    className="w-full object-cover rounded-lg aspect-square"
                    width={width}
                    height={height}
                />
                <div className="flex justify-between px-2">
                    Score: {score}
                    <button onClick={() => handleVote(score + 1)} title="Vote up">
                        <ArrowUp className="drop-shadow-lg" />
                        <span className="sr-only">Vote up</span>
                    </button>
                    <button onClick={() => handleVote(score - 1)} title="Vote down">
                        <ArrowDown className="drop-shadow-lg" />
                        <span className="sr-only">Vote down</span>
                    </button>
                    <button
                        onClick={() => handleFavourite()}
                        title={`${favourite ? "Unfavourite" : "Favourite"} ${id}`}
                    >
                        <Heart
                            className="drop-shadow-lg"
                            fill={`${favourite ? "red" : "none"}`}
                            stroke={`${favourite ? "red" : "black"}`}
                        />
                        <span className="sr-only">{favourite ? "Unfavourite" : "Favourite"}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageCard
