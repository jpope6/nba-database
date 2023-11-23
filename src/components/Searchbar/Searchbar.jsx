import "./Searchbar.css";
import { useNbaData } from "../../hooks/useNbaData";

import React, { useEffect, useState } from "react";
import search from "../../images/search-solid.svg";

const Searchbar = ({ setGameIDs, setGameData, setTeamData, setPlayerData }) => {
    const [searchDate, setSearchDate] = useState("");

    const { fetchGameIDs, fetchGameDetails, fetchTeamDetails, fetchPlayerDetails } = useNbaData();


    const handleSearchChange = (e) => {
        setSearchDate(e.target.value);
    };

    const getGameDetails = async (IDs) => {
        try {
            const fetchedGameDetails = await fetchGameDetails(IDs);
            setGameData(fetchedGameDetails);
            return fetchedGameDetails;
        } catch (e) {
            console.error("Error fetching game details: ", e);
        }
    }

    const getTeamDetails = async (data) => {
        try {
            const fetchedTeamDetails = {};

            for (const game of data) {
                const homeTeamData = await fetchTeamDetails(game.HOME_TEAM_ID);
                const awayTeamData = await fetchTeamDetails(game.VISITOR_TEAM_ID);

                homeTeamData[0].logo = '../../images/logos/' + homeTeamData[0].NICKNAME + '.png';
                awayTeamData[0].logo = '../../images/logos/' + awayTeamData[0].NICKNAME + '.png';

                fetchedTeamDetails[game.HOME_TEAM_ID] = homeTeamData[0];
                fetchedTeamDetails[game.VISITOR_TEAM_ID] = awayTeamData[0];
            }

            setTeamData(fetchedTeamDetails);
        } catch (e) {
            console.error("Error fetching game details: ", e);
        }
    }

    const getPlayerData = async (data) => {
        try {
            const playerDataMap = {};

            const promises = data.map(async (game) => {
                const homePlayerData = await fetchPlayerDetails(game.GAME_ID, game.HOME_TEAM_ID);
                const visitorPlayerData = await fetchPlayerDetails(game.GAME_ID, game.VISITOR_TEAM_ID);

                // Use the game ID as the key in the map
                playerDataMap[game.GAME_ID] = {
                    home: homePlayerData,
                    visitor: visitorPlayerData
                };
            });

            await Promise.all(promises);

            setPlayerData(playerDataMap);
        } catch (e) {
            console.error("Error fetching game details: ", e);
        }
    };

    const handleSubmit = async () => {
        try {
            // Display a loading indicator or spinner
            // Reset the data
            setGameData([]);
            setTeamData({});
            const fetchedGameIDs = await fetchGameIDs(searchDate);
            setGameIDs(fetchedGameIDs);

            const fetchedGameDetails = await getGameDetails(fetchedGameIDs);
            await getTeamDetails(fetchedGameDetails);
            await getPlayerData(fetchedGameDetails);
        } catch (error) {
            console.error("Error fetching game IDs: ", error);
        }
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
                {/*    {data.map((details, index) => (
                    <h3 key={index}>
                        {`${details.CITY} ${details.NICKNAME}`}
                    </h3>
                ))}
            */}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>

    );
};

export default Searchbar;
