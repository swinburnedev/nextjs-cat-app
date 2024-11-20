import {Heart, ArrowUp, ArrowDown} from "lucide-react"
import Image from "next/image"
import {useState} from "react"

import {apiPost} from "@/libs/api"

interface ImageCardProps {
    id: string
    height: number
    score: number
    url: string
    width: number
}

const ImageCard = ({id, url, width, height, score: initialScore}: ImageCardProps) => {
    const [favourite, setFavourite] = useState(false)
    const [score, setScore] = useState(initialScore)
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
        <div className="mb-6 px-2 relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="flex flex-col gap-1">
                <Image
                    src={url}
                    alt={id}
                    className="w-full object-cover rounded-lg aspect-square"
                    width={width}
                    height={height}
                />
                <div className="flex justify-between px-2">
                    <p className="font-bold">
                        Score: <span className="font-light">{score}</span>
                    </p>
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
