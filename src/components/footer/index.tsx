import Link from "next/link"
import Image from "next/image"

const Footer = () => {
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mb-6">
            <Link
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://www.swinburne.dev"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
                Built by Swinburne Dev
            </Link>
        </footer>
    )
}

export default Footer
