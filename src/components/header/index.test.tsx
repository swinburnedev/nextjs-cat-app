import "@testing-library/jest-dom"
import {render, screen} from "@testing-library/react"

import Header from "."

describe("Header", () => {
    it("should render the header", () => {
        render(<Header />)
        const h1 = screen.getByRole("heading", {level: 1})
        expect(h1).toBeInTheDocument()

        const nav = screen.getByRole("navigation")
        expect(nav).toBeInTheDocument()

        const homeLink = screen.getByRole("link", {name: /home/i})
        expect(homeLink).toBeInTheDocument()

        const uploadLink = screen.getByRole("link", {name: /upload/i})
        expect(uploadLink).toBeInTheDocument()
    })
})
