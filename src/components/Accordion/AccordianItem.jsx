import React, { useState } from "react";
import Spinner from "../Spinner/Spinner";
import { teamLogos } from "../../images/logos";


import "./Accordion.css"

function AccordianItem({ gameData, teamData, playerData }) {
    const [expanded, setExpanded] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState('home');


    console.log(gameData);
    console.log('team', teamData);
    console.log(playerData);

    function handleItemClicked() {
        setExpanded((expanded) => !expanded);
    }


    return (
        <div className="accordion-item">
            <div className="accordion-title-wrapper" onClick={handleItemClicked}>

                <div className="team">
                    {teamData[gameData.VISITOR_TEAM_ID] && (
                        <img
                            src={teamLogos[teamData[gameData.VISITOR_TEAM_ID].NICKNAME]}
                            alt={`${teamData[gameData.VISITOR_TEAM_ID]?.NICKNAME}.png`}
                            className='logo'
                        />
                    )}

                    <h3>{`${teamData[gameData.VISITOR_TEAM_ID]?.CITY} ${teamData[gameData.VISITOR_TEAM_ID]?.NICKNAME}`}</h3>
                    <h3>{`${gameData.PTS_AWAY}`}</h3>
                </div>

                <h3>@</h3>

                <div className="team">
                    <h3>{`${gameData.PTS_HOME}`}</h3>
                    <h3>{`${teamData[gameData.HOME_TEAM_ID]?.CITY} ${teamData[gameData.HOME_TEAM_ID]?.NICKNAME}`}</h3>

                    {teamData[gameData.HOME_TEAM_ID] && (
                        <img
                            src={teamLogos[teamData[gameData.HOME_TEAM_ID].NICKNAME]}
                            alt={`${teamData[gameData.HOME_TEAM_ID]?.NICKNAME}.png`}
                            className='logo'
                        />
                    )}
                </div>


            </div>
            <div className={`accordion-description ${expanded ? "expand-accordion-item" : ""}`}>
                {playerData ? (
                    <div>
                        <h3>Home Team Player Stats</h3>
                        <ul>
                            {playerData.home.map((player, index) => (
                                <div key={index}>
                                    <p>{player.PLAYER_NAME}</p>
                                    <p>MIN: {player.MIN}, PTS: {player.PTS}, AST: {player.AST}, REB: {player.REB}, BLK: {player.BLK}, STL: {player.STL}, TO: {player.TO}, PLUS_MINUS: {player.PLUS_MINUS}</p>
                                </div>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="spinner-container">
                        <Spinner />
                    </div>
                )}
            </div>
        </div >
    )
}

export default AccordianItem;
