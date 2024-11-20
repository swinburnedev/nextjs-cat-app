import Footer from "../footer"
import Header from "../header"
// import localFont from "next/font/local"

// const geistSans = localFont({
//     src: "@/fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// })
// const geistMono = localFont({
//     src: "@/fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// })

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        // ${geistSans.variable} ${geistMono.variable}
        <div
            className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
        >
            <Header />
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
