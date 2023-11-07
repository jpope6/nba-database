import "./Searchbar.css";
import { useNbaData } from "../../hooks/useNbaData";

import React, { useState } from "react";
import search from "../../images/search-solid.svg";

const Searchbar = () => {
    const [searchDate, setSearchDate] = useState("");
    const [standings, setStandings] = useState([])
    const { fetchStandings } = useNbaData();

    const handleSearchChange = (e) => {
        setSearchDate(e.target.value);
        console.log(" the date was set to: " + e.target.value);
        // Axios.get("http://localhost:3001/standings")
        //     .then((response) => {
        //         console.log(response.data);
        //         setStandings(response.data);
        //     })
    };

    const handleSubmit = async () => {
        const ans = await fetchStandings(searchDate);
        console.log(ans);
    }


    return (
        <div className="search-bar">
            <input
                type="date"
                className="search-input"
                placeholder="Seach"
                onChange={(e) => handleSearchChange(e)}
            />
            <div className="standings">
                {standings.map((val, key) => (
                    <h3 key={key}>Name: {val.PTS_Home} </h3>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>

    );
};

export default Searchbar;
