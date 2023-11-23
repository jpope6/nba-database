import { useContext } from "react";
import { BackendUrlContext } from "../contexts/BackendUrlContext";
import axios from "axios";

export function useNbaData() {
  const backendUrl = useContext(BackendUrlContext);

  const fetchGameIDs = async (searchDate) => {
    try {
      const response = await axios.get(
        `${backendUrl}/getGameIDs`, {
        params: {
          date: searchDate
        }
      })

      return response.data.gameIDs;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTeamDetails = async (teamID) => {
    try {
      const response = await axios.get(
        `${backendUrl}/getTeamDetails`, {
        params: {
          teamID: teamID
        }
      });

      return response.data.teamDetails;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchGameDetails = async (gameIDs) => {
    try {
      const response = await axios.get(
        `${backendUrl}/getGameDetails`, {
        params: {
          gameIDs: gameIDs
        }
      });

      return response.data.gameDetailsArray;
    } catch (e) {
      console.log(e);
    }
  }

  const fetchPlayerDetails = async (gameID, teamID) => {
    try {
      const response = await axios.get(
        `${backendUrl}/getPlayerDetails`, {
        params: {
          gameID: gameID,
          teamID: teamID
        }
      });

      return response.data.playerDetails;
    } catch (e) {
      console.log(e);
    }
  }



  return { fetchGameIDs, fetchTeamDetails, fetchGameDetails, fetchPlayerDetails }
};
