import React, { useState } from "react";
import Spinner from "../Spinner/Spinner";
import { teamLogos } from "../../images/logos";
import Switch from "react-switch";


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

    const handleSwitchClick = () => {
        if (selectedTeam === 'home') {
            setSelectedTeam('away');
        } else {
            setSelectedTeam('home');
        }
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
                        <div className="description-header">
                            <h3>
                                {`${selectedTeam === 'home'
                                    ?
                                    teamData[gameData.HOME_TEAM_ID].NICKNAME
                                    :
                                    teamData[gameData.VISITOR_TEAM_ID].NICKNAME}`} Stats
                            </h3>
                            <Switch
                                checked={selectedTeam === 'home' ? true : false}
                                onChange={handleSwitchClick}
                                onColor="#86d3ff"
                                onHandleColor="#2693e6"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={20}
                                width={48}
                                className="react-switch"
                                id="material-switch"
                            />
                        </div>
                        {selectedTeam === 'home'
                            ? playerData.home.map((player, index) => (
                                <div key={index}>
                                    <p>{player.PLAYER_NAME}</p>
                                    <p>MIN: {player.MIN}, PTS: {player.PTS}, AST: {player.AST}, REB: {player.REB}, BLK: {player.BLK}, STL: {player.STL}, TO: {player.TO}, PLUS_MINUS: {player.PLUS_MINUS}</p>
                                </div>
                            ))
                            : playerData.visitor.map((player, index) => (
                                <div key={index}>
                                    <p>{player.PLAYER_NAME}</p>
                                    <p>MIN: {player.MIN}, PTS: {player.PTS}, AST: {player.AST}, REB: {player.REB}, BLK: {player.BLK}, STL: {player.STL}, TO: {player.TO}, PLUS_MINUS: {player.PLUS_MINUS}</p>
                                </div>
                            ))
                        }
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
