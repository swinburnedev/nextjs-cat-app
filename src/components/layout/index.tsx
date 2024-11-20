import Head from "next/head"

import Footer from "../footer"
import Header from "../header"

const Layout = ({children, title}: {children: React.ReactNode; title: string}) => {
    return (
        <div className="container mx-auto flex flex-col items-center min-h-screen">
            <Head>
                <title>Cat Feed | {title}</title>
                <meta name="description" content="A simple cat feed app" />
            </Head>
            <Header />
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
