import "./Searchbar.css";
import { useNbaData } from "../../hooks/useNbaData";

import React, { useEffect, useState } from "react";
import search from "../../images/search-solid.svg";

const Searchbar = () => {
    const [searchDate, setSearchDate] = useState("");
    const [standings, setStandings] = useState([]);
    const [homeTeamID, setHomeTeamID] = useState([]);
    const [data, setData] = useState([]);
    const { fetchStandings, fetchTeamDetails } = useNbaData();


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
        console.log("in handle submit, here are home team ids")
        const ans = await fetchStandings(searchDate);
        setStandings(ans.result);
        console.log(ans.result);

        const ans2 = ans.result.map((item) => item.HOME_TEAM_ID);
        setHomeTeamID(ans2);
        // console.log("here are the team IDS :", ans2);
        // console.log("here is the updated homeTeamID state: ", homeTeamID)


        // const ans3 = await fetchTeamDetails(homeTeamID);
        // console.log("here are supposed to be the team details", ans3);


    }

    useEffect(() => {
        async function getTeamDetails() {
            try {
                console.log("useEffect", homeTeamID);
                const newData = [];
                for (const team of homeTeamID) {
                    const details = await fetchTeamDetails(team)
                    console.log("here are supposed to be the team details", details);

                    newData.push(details);
                }

                setData(newData);
            } catch (e) {
                console.error("Error fetching home team IDs: ", e);
            }
        }

        getTeamDetails();
        console.log('useEffect: ', data);
    }, [homeTeamID]);



    return (
        <div className="search-bar">
            <input
                type="date"
                className="search-input"
                placeholder="Seach"
                onChange={(e) => handleSearchChange(e)}
            />
            <div className="standings">
                {data.map((details, index) => (
                    <h3 key={index}>
                        {`${details.CITY} ${details.NICKNAME}`}
                    </h3>
                ))}



                {/* {standings.map((val, key) => (
                    <h3 key={key}> GAME ID: {val.GAME_ID}&nbsp;&nbsp;&nbsp; Season: {val.SEASON}&nbsp;&nbsp;&nbsp; Game ID: {val.GAME_ID}&nbsp;&nbsp;&nbsp; Home Team ID: {val.HOME_TEAM_ID}&nbsp;&nbsp;&nbsp; Visitor Team ID: {val.VISITOR_TEAM_ID} </h3>
                ))} */}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>

    );
};

export default Searchbar;
