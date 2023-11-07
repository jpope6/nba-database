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
        setStandings(ans.result);
        console.log(ans);
        console.log("in the searc bar.jsx")
        console.log(ans.result);
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
                    <h3 key={key}> Season: {val.SEASON}&nbsp;&nbsp;&nbsp; Game ID: {val.GAME_ID}&nbsp;&nbsp;&nbsp; Home Team ID: {val.HOME_TEAM_ID}&nbsp;&nbsp;&nbsp; Visitor Team ID: {val.VISITOR_TEAM_ID} </h3>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>

    );
};

export default Searchbar;
