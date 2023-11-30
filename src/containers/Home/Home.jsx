import React, { useState, useEffect } from "react";
import "./Home.css";

import Header from "../../components/Header/Header";
import Searchbar from "../../components/Searchbar/Searchbar";
import Accordian from "../../components/Accordion/Accordion";
import AccordianItem from "../../components/Accordion/AccordianItem";

export default function Home() {
    const [searchDate, setSearchDate] = useState("");
    const [gameIDs, setGameIDs] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [teamData, setTeamData] = useState({});
    const [playerData, setPlayerData] = useState({});

    return (
        <div className="home">
            <Header />
            <div className="main">
                <h1 className="title">Pick a date between the 2004 (10/28/03) and 2022 (6/6/22) season.</h1>
                <Searchbar
                    searchDate={searchDate}
                    setSearchDate={setSearchDate}
                    setGameIDs={setGameIDs}
                    setGameData={setGameData}
                    setTeamData={setTeamData}
                    setPlayerData={setPlayerData}
                />


                {gameData ? (
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
                ) : (
                    searchDate !== "" && <h2 className="words">No games found on that date.</h2>
                )}
            </div>
        </div>
    );
}
