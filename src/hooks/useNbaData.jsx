import { useContext } from "react";
import { BackendUrlContext } from "../contexts/BackendUrlContext";
import axios from "axios";

export function useNbaData() {
  const backendUrl = useContext(BackendUrlContext);

  const fetchStandings = async (searchDate) => {
    try {
      console.log(`${backendUrl}/standings`);

      const response = await axios.get(
        `${backendUrl}/standings`, {
        params: {
          date: searchDate
        }
      })

      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTeamDetails = async (homeTeamID) => {
    try {
      console.log(`${backendUrl}/homeTeamDetails`);
      console.log("the home team IDs from front end are: ", homeTeamID)
      const response2 = await axios.get(
        `${backendUrl}/homeTeamDetails`, {
        params: {
          hometeam: homeTeamID
        }
      });

      console.log('Hook', response2.data);
      
      return response2.data.details;
    } catch (e) {
      console.log(e);
    }
  };
  


  return { fetchStandings,fetchTeamDetails  }
};
