
import "./grammar.css";
import React from "react";

const Grammar = (props) =>{

        
    const [numOfGram, setTestNum] = React.useState(0);

    const Next =(event)=>{

        if (numOfGram < props.phen.length - 2){
            setTestNum(numOfGram + 1);
        }
        else if (numOfGram === props.phen.length - 2){
            setTestNum(numOfGram + 1);
            document.getElementsByClassName("arrowRightTest")[0].classList.add("hidden");
        }

    }

    const Prev =(event)=>{
        if (numOfGram > 0) {
            setTestNum((numOfGram - 1));
        }
        else {
            document.getElementsByClassName("arrowLeftTest")[0].classList.add("hidden");

        }
        if (numOfGram === props.phen.length - 1){
            document.getElementsByClassName("arrowRightTest")[0].classList.remove("hidden");
        }

    }    

    const CharSet = props.char[numOfGram].map((item, index) =>
        <span className={item.color}>
                {item.char}
        </span>
    )
    const TransSet = props.trans[numOfGram].map((item, index) =>
        <span className="Trans">
                {item}
        </span>
    )

    return(
        <div className="page">
                <h1>Грамматика {props.links.title}</h1> 
            <div className="grammarPage">
                <div>
                    <div onClick={Prev} className={numOfGram===0 ? "arrowLeftTest hidden" : "arrowLeftTest"}>
                        <img src="/images/arrowLeft.png" alt="arrow_left_button"/>
                    </div>
                </div>
                <div>
                    
                    <div className="grammarChar">
                        {CharSet}
                    </div>
                    <div className="grammarPhen">
                        {props.phen[numOfGram]}
                    </div>
                    <div className="grammarTrans">
                        {TransSet}
                    </div>
    
                </div>
                <div className="grammarNum">
                        {(numOfGram+1)+ "/" + props.phen.length}
                    </div>
                <div>
                    <div onClick={Next} className="arrowRightTest">
                        <img src="/images/arrowRight.png" alt="arrow_right_button"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Grammar