import "./Searchbar.css";
import Axios from "axios";

import React, { useState } from "react";
import search from "../../images/search-solid.svg";

const Searchbar = () => {
    const [searchDate, setSearchDate] = useState("");
    const [standings, setStandings] = useState([])

    const handleSearchChange = (e) => {
        setSearchDate(e.target.value);
        console.log(" the date was set to: " + e.target.value);
        // Axios.get("http://localhost:3001/standings")
        //     .then((response) => {
        //         console.log(response.data);
        //         setStandings(response.data);
        //     })
    };

    const handleSubmit = () => {
        Axios.get("http://localhost:3001/standings", {
            params: {
                date: searchDate
            }
        })
            .then((response) => {
                setStandings(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

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
