import Link from "next/link"

const Header = () => {
    return (
        <header>
            <h1 className="block text-2xl sm:text-4xl font-bold mt-8 text-center">Cat Feed!</h1>
            <nav className="w-full py-2">
                <ul className="flex flex-row pb-4">
                    <li className="block py-2 pr-4 pl-3 rounded">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="block py-2 pr-4 pl-3 rounded">
                        <Link href="/upload">Upload</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
