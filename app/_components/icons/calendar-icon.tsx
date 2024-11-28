import { SVGProps } from "react"
const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox="0 0 256 256"
        {...props}
    >
        <path d="M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM72 48v8a8 8 0 0 0 16 0v-8h80v8a8 8 0 0 0 16 0v-8h24v32H48V48Zm136 160H48V96h160v112Zm-68-76a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm44 0a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm-88 40a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm44 0a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm44 0a12 12 0 1 1-12-12 12 12 0 0 1 12 12Z" />
    </svg>
)
export default CalendarIcon
