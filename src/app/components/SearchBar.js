import { useState } from "react"

export default function SearchBar({ onSubmit }) {
    const [city,setCity] = useState("");

    const handleChange = (event) => {
        setCity(event.target.value);
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(city)
    } 

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={city} onChange={handleChange} placeholder="Enter city name ..." 
                className="border-1 border-[#373A70] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]"/>
            </form>
        </div>
    )
}