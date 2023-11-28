import React, { useState } from "react";
import Spinner from "../Spinner/Spinner";
import { teamLogos } from "../../images/logos";
import Switch from "react-switch";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

                    <h3 className="words">{`${teamData[gameData.VISITOR_TEAM_ID]?.CITY} ${teamData[gameData.VISITOR_TEAM_ID]?.NICKNAME}`}</h3>
                </div>


                <h3 className="words">{`${gameData.PTS_AWAY}`}</h3>

                <h3 className="words">@</h3>

                <h3 className="words">{`${gameData.PTS_HOME}`}</h3>

                <div className="team">
                    <h3 className="words">{`${teamData[gameData.HOME_TEAM_ID]?.CITY} ${teamData[gameData.HOME_TEAM_ID]?.NICKNAME}`}</h3>

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
                            <h3 className="words">
                                {`${selectedTeam === 'home'
                                    ? teamData[gameData.HOME_TEAM_ID].NICKNAME
                                    : teamData[gameData.VISITOR_TEAM_ID].NICKNAME}`} Stats
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

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Players</TableCell>
                                        <TableCell align="right">MIN</TableCell>
                                        <TableCell align="right">PTS</TableCell>
                                        <TableCell align="right">AST</TableCell>
                                        <TableCell align="right">REB</TableCell>
                                        <TableCell align="right">BLK</TableCell>
                                        <TableCell align="right">STL</TableCell>
                                        <TableCell align="right">TO</TableCell>
                                        <TableCell align="right">+/-</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedTeam === 'home'
                                        ? playerData.home.map((player, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{player.PLAYER_NAME}</TableCell>
                                                <TableCell align="right">{player.MIN}</TableCell>
                                                <TableCell align="right">{player.PTS}</TableCell>
                                                <TableCell align="right">{player.AST}</TableCell>
                                                <TableCell align="right">{player.REB}</TableCell>
                                                <TableCell align="right">{player.BLK}</TableCell>
                                                <TableCell align="right">{player.STL}</TableCell>
                                                <TableCell align="right">{player.TO}</TableCell>
                                                <TableCell align="right">{player.PLUS_MINUS}</TableCell>
                                            </TableRow>
                                        ))
                                        : playerData.visitor.map((player, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{player.PLAYER_NAME}</TableCell>
                                                <TableCell align="right">{player.MIN}</TableCell>
                                                <TableCell align="right">{player.PTS}</TableCell>
                                                <TableCell align="right">{player.AST}</TableCell>
                                                <TableCell align="right">{player.REB}</TableCell>
                                                <TableCell align="right">{player.BLK}</TableCell>
                                                <TableCell align="right">{player.STL}</TableCell>
                                                <TableCell align="right">{player.TO}</TableCell>
                                                <TableCell align="right">{player.PLUS_MINUS}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>                    </div>
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
