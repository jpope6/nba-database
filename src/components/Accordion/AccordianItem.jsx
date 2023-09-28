import React, { useState } from "react";

import "./Accordion.css"

function AccordianItem({ title, descriptions }) {
    const [expanded, setExpanded] = useState(false);

    function handleItemClicked() {
        setExpanded((expanded) => !expanded);
    }

    return (
        <div className="accordion-item">
            <div className="accordion-title-wrapper" onClick={handleItemClicked}>
                <h3 className="accordion-title" >{title}</h3>
                <h3 className="accordion-title">{expanded ? "-" : "+"}</h3>
            </div>
            <div className={`accordion-description ${expanded ? "expand-accordion-item" : ""}`}>
                {descriptions.map((description, index) => (
                    <p className="accordion-description-text" key={index}>{description}</p>
                ))}
            </div>
        </div>
    )
}

export default AccordianItem;
