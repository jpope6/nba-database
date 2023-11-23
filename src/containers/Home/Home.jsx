import React, { useState, useEffect } from "react";
import "./Home.css";

import Searchbar from "../../components/Searchbar/Searchbar";
import Accordian from "../../components/Accordion/Accordion";
import AccordianItem from "../../components/Accordion/AccordianItem";

export default function Home() {
    const [gameIDs, setGameIDs] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [teamData, setTeamData] = useState({});
    const [playerData, setPlayerData] = useState({});


    useEffect(() => {
        console.log("gameIDs changed:", gameIDs);
    }, [gameIDs]);

    useEffect(() => {
        console.log("gameData changed:", gameData);
    }, [gameData]);

    useEffect(() => {
        console.log("teamData changed:", teamData);
    }, [teamData]);

    useEffect(() => {
        console.log("playerData changed:", playerData);
    }, [playerData]);

    return (
        <div className="main">
            <h1 className="title"> Pick a date</h1>
            <Searchbar
                setGameIDs={setGameIDs}
                setGameData={setGameData}
                setTeamData={setTeamData}
                setPlayerData={setPlayerData}
            />
            <Accordian>
                {gameData.map((game, index) => (
                    <AccordianItem
                        key={index}
                        gameData={game}
                        teamData={teamData}
                        playerData={playerData[game.GAME_ID]}
                    />
                ))}
            </Accordian>
        </div>
    );
}
