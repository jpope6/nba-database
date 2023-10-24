import React from "react";
import "./Home.css";

import Searchbar from "../../components/Searchbar/Searchbar";

export default function Home() {
    return (
        <div className="main">
            <h1 className = "title"> Pick a date</h1>
            <Searchbar />
        </div>
    );
}
