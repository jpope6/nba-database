import "./Searchbar.css";

import React, { useState } from "react";
import search from "../../images/search-solid.svg";

const Searchbar = () => {
    const [searchDate, setSearchDate] = useState("");

    const handleSearchChange = (e) => {
        setSearchDate(e.target.value);
    };

    return (
        <div className="search-bar">
            <input 
                type="date"
                className="search-input"  
                placeholder="Seach"
                onChange={(e) => handleSearchChange(e)}
            />
        </div>
    );
};

export default Searchbar;
