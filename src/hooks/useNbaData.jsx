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


  return { fetchStandings }
};
