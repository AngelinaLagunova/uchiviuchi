import "./location.css";
import { Link } from "react-router-dom";
import React, { useState } from 'react';



const Location =(props) =>
{
    const [isExpanded, setIsExpanded] = useState(false);

    const maxChars = 458

    const truncatedText = props.info.length > maxChars ? props.info.slice(0, maxChars) + '...' : props.info;

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
    return(
        <>
            <div className="page">

                <div className="locationHeader"> 
                    <img src={props.links.pictmap} alt="map_picture"/>
                    <h1>{props.name.province} <br/> {props.name.city}</h1>
                </div>
                
                <article>
                    <div className="info"> 
                    <div
                        dangerouslySetInnerHTML={{
                            __html: isExpanded ? props.info : truncatedText,
                            }}
                        />
                        {props.info.length > maxChars && (
                            <div className="reaadMoreButton">
                                <button className="button" onClick={toggleExpand}>
                                {isExpanded ? 'Свернуть' : 'Читать далее'}
                                </button>
                            </div>
                        )}
                    </div>
                    <div> 
                        <div className="sectionName">Категории новых слов</div>
                        <div className="wrap2"><Link to={props.links.food}>
                            <button className="button" width="500px">Блюда 有名的美食</button></Link></div>
                        <div className="wrap2"><Link to={props.links.sights}>
                            <button className="button">Достопримечательности 名胜古迹</button></Link></div>
                    </div>
                </article>
            </div>
        </>
    )
}


export default Location

