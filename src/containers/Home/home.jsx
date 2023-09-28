import Accordian from "../../components/Accordion/Accordion";
import AccordianItem from "../../components/Accordion/AccordianItem";

import "./home.css";


export default function Home() {
    return (
        <div className="main">
            <DropdownMenu />
        </div>
    );
}


function DropdownMenu() {
    return (
        <Accordian>
            <AccordianItem
                title={"Pathfinding Algorithms"}
                descriptions={["Dijkstra's algorithm", "A* algorithm"]}
            />

            <AccordianItem
                title={"Sorting Algorithms"}
                descriptions={["pussy"]}
            />

            <AccordianItem
                title={"Traversal Algorithms"}
                descriptions={["Breath First Seach", "Depth First Search", "Test", "test", "test"]}
            />
        </ Accordian>
    );
}
