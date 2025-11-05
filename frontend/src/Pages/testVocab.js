import "./testVocab.css";
import React from 'react';
import { Link } from "react-router-dom";


const TestVocab =(props) =>{
    
    const [ answers, setAnsw ] = React.useState([]);

    const [ testState, setTestState ] = React.useState(true);


    const [numOfTest, setTestNum] = React.useState(0);

    const Next =(event)=>{

        if (numOfTest < props.words.length - 1){
            setTestNum(numOfTest + 1);
            document.getElementById("submitButton").classList.remove("wrongAnswer");
            document.getElementById("submitButton").classList.remove("rightAnswer");


        }
        else if (numOfTest === props.words.length){
            setTestNum(numOfTest + 1);
        }
        else {
            setTestState(false)
        }
        document.getElementsByClassName("page")[0].classList.remove("rightAnswerBg");
        document.getElementsByClassName("page")[0].classList.remove("wrongAnswerBg");
        

        
    }
    
    const Prev =(event)=>{
        if (numOfTest > 0) {
            setTestNum((numOfTest - 1));
            document.getElementById("submitButton").classList.remove("wrongAnswer");
            document.getElementById("submitButton").classList.remove("rightAnswer");

        }
        else {
            document.getElementsByClassName("arrowLeftTest")[0].classList.add("hidden");

        }
        if (numOfTest === props.words.length - 1){
            document.getElementsByClassName("arrowRightTest")[0].classList.remove("hidden");
        }
        document.getElementsByClassName("page")[0].classList.remove("rightAnswerBg");
        document.getElementsByClassName("page")[0].classList.remove("wrongAnswerBg");


    }

    const [ selected, setSelected ] = React.useState("var1");


    const onOptionChange =(event) =>{
        setSelected(event.target.value);
    }

    const formSubmit =(e)=> {
        e.preventDefault();
        console.log(selected);

        if (selected===props.words[numOfTest].rightVar){
            console.log("right");
            document.getElementById("submitButton").classList.add("rightAnswer");
            document.getElementById("submitButton").classList.remove("wrongAnswer");
            document.getElementsByClassName("page")[0].classList.add("rightAnswerBg");

            
            if (!(numOfTest in answers)) {
                answers.push({
                    id:numOfTest,
                    answ: "r",
                })
                setAnsw(answers);
            }
            console.log(answers);
           

        }
        else {
            console.log("wrong");
            document.getElementById("submitButton").classList.add("wrongAnswer");
            document.getElementsByClassName("page")[0].classList.add("wrongAnswerBg");

            console.log(selected);
            
            if (!(numOfTest in answers)) {
                answers.push({
                    id:numOfTest,
                    answ: "w",
                })
                setAnsw(answers);
            }
            console.log(answers);


        }

    }

    const Results = () =>{
        let r=0;
        for(let i=0; i<answers.length; i++){
            if (answers[i].answ==="r") r++;
        }
        return r +"/"+ answers.length
    }        
        
    

        if (testState){
        return(
            <div className="page">
            <h1>Тест {Number(numOfTest +1) +"/"+ props.words.length}</h1>
            <div className="testVocabPage">
                <div>
                    <div onClick={Prev} className={Number(numOfTest)===0 ? "arrowLeftTest hidden" : "arrowLeftTest"}>
                        <img src="/images/arrowLeft.png" alt="arrow_left_button"/>
                    </div>
                </div>
                
                <div className="testVocab">
                    <div className="testPict">
                        <img src={props.words[numOfTest].pict} alt="test_pict"/>
                        {props.words[numOfTest].char} <br/> <br/> {props.words[numOfTest].phen}
                    </div>
                    <div className="testVariants">


                        <form onSubmit={formSubmit}>
                            
                            <div className = "testRadio">
                            <input type="radio" value="var1" id="var1" name="variants" onChange={onOptionChange} checked={selected==="var1"} /> {props.words[numOfTest].var1}
                            </div>

                            <div className = "testRadio">
                            <input type="radio" value="var2" id="var2" name="variants" checked={selected==="var2"} onChange={onOptionChange}/> {props.words[numOfTest].var2}
                            </div>

                            <div className = "testRadio">
                            <input type="radio" value="var3" id="var3" name="variants" checked={selected==="var3"} onChange={onOptionChange}/> {props.words[numOfTest].var3}
                            </div>

                            <div id="submitButton">
                                <button className="button"  type="submit">Ответить</button> 
                            </div>

                        </form>
                    </div>

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

    return (
        <div className="page">
            <h1>Тест</h1>

            <div className="endOfTest">
                Тест пройден!
            </div>

            <div className = "results">
                Вы набрали <Results/> баллов! <Link to={props.links.testVocab}> <span onClick = "window.location.reload()" > Пройти еще раз? </span> </Link>

            </div>
            <div className="testResults">
            <Link to={props.links.grammar}><button className="button" >Перейти к изучению грамматики</button> </Link>
            </div>
            <div className="testResults">
            <Link to={props.links.location}><button className="button" >Вернуться к категориям слов</button> </Link>
            </div>
            

        </div>
    )
    


}

export default TestVocab;