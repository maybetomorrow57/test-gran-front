import React from "react";
import arrowup from "../styles/images/arrowup.svg";
import arrowdown from "../styles/images/arrowdown.svg";


interface Props {
    sortType: "ASC" | "DESC";
}


const VisualSort: React.FC<Props> = ({sortType}) => {

    if (sortType === "ASC") {
        return (
            <img src={arrowdown} alt="arrowDown" className="visual-sort"/>
        );
    }
    return (
        <img src={arrowup} alt="arrowDown" className="visual-sort"/>
    );

};

export default VisualSort;
