import {Heart} from "lucide-react"
import Image from "next/image"
import {useState} from "react"

interface ImageCardProps {
    id: string
    isFavourite: boolean
    height: number
    url: string
    width: number
}

const ImageCard = ({id, isFavourite, url, width, height}: ImageCardProps) => {
    const [favourite, setFavourite] = useState(isFavourite)
    const handleFavourite = async () => {
        const body = JSON.stringify({
            image_id: id,
        })
        try {
            await fetch("https://api.thecatapi.com/v1/favourites", {
                method: "POST",
                headers: {"x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || ""},
                body,
            }).then(response => {
                if (response.ok) {
                    setFavourite(!favourite)
                }
            })
        } catch (error) {
            console.error(`Error setting favourite ${id}`, error)
        }
    }
    return (
        <div className="mb-4 px-2 relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Image src={url} alt={id} className="w-96 h-96 object-cover rounded-lg" width={width} height={height} />
            <button
                className="absolute bottom-2 right-4"
                onClick={() => handleFavourite()}
                title={`${favourite ? "Unfavourite" : "Favourite"} ${id}`}
            >
                <Heart
                    className="drop-shadow-lg"
                    fill={`${favourite ? "red" : "none"}`}
                    stroke={`${favourite ? "red" : "white"}`}
                />
                <span className="sr-only">{favourite ? "Unfavourite" : "Favourite"}</span>
            </button>
        </div>
    )
}

export default ImageCard
