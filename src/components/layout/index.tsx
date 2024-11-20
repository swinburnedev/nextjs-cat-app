import Head from "next/head"

import Footer from "../footer"
import Header from "../header"

const Layout = ({children, title}: {children: React.ReactNode; title: string}) => {
    return (
        <div
            className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
        >
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
