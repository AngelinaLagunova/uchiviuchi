import './game1.css';
import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { Link } from "react-router-dom";




const DropZone = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} className="DropZone" id="DropZone" style={{border: `1px dashed ${isOver ? 'green' : 'black'}`}}>
            Перетаскивайте <br/>
            блоки сюда
        </div>
    );
};


const DragItem = ({ name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { name },
        collect: (monitor) => {
            const item = monitor.getItem();
            if (item) {
            }
            return {
                isDragging: monitor.isDragging(),
            };
        },
    }), [name]);

    return (
        <div ref={drag} className="DragItem" style={{ opacity: isDragging ? 0.5 : 1 }}>
            {name}
        </div>
    );
};


const Game1 = (props) => {
    const [droppedItems, setDroppedItems] = React.useState([]);
    const [ testState, setTestState ] = React.useState(true);
    const [ answers, setAnsw ] = React.useState([]);
    const [rightAnswer, setRightAnswer] = React.useState(false);

    const handleDrop = (item) => {
        setDroppedItems((prevItems) => {
            if (prevItems.some((droppedItem) => droppedItem.name === item.name)) {
                let DropZone = document.getElementById("DropZone");
                DropZone.classList.add("wrongDrop");
                DropZone.innerHTML = "Элемент уже добавлен"
                return prevItems;
            }

            let DropZone = document.getElementById("DropZone");
            DropZone.classList.remove("wrongDrop");
            DropZone.innerHTML = "Перетаскивайте блоки сюда"
            const newItems = [...prevItems, item];
            return newItems;
        });
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...droppedItems];
        updatedItems.splice(index, 1);
        setDroppedItems(updatedItems);
    };

    const [numOfTest, setTestNum] = React.useState(0);

    const Next =(event)=>{
        console.log(numOfTest);
        if (numOfTest < props.list.length - 1){
            setDroppedItems([]);
            let DropZone = document.getElementById("DropZone");
            DropZone.classList.remove("wrongDrop");
            DropZone.innerHTML = "Перетаскивайте блоки сюда"
            setTestNum(numOfTest + 1);
            document.getElementById("submitButton").classList.remove("wrongAnswer");
            document.getElementById("submitButton").classList.remove("rightAnswer");
        }
        else if(numOfTest === props.list.length) {
            console.log("hi");
            setTestNum(numOfTest + 1);
        }
        else {
            setTestState(false)
            document.getElementsByClassName("page")[0].classList.remove("rightAnswerBg");
            document.getElementsByClassName("page")[0].classList.remove("wrongAnswerBg");
        }
        document.getElementsByClassName("page")[0].classList.remove("rightAnswerBg");
        document.getElementsByClassName("page")[0].classList.remove("wrongAnswerBg");
        setRightAnswer(false);

        
    }
    
    const Prev =(event)=>{
        if (numOfTest > 0) {
            setTestNum((numOfTest - 1));
            setDroppedItems([]);
            let DropZone = document.getElementById("DropZone");
            DropZone.classList.remove("wrongDrop");
            DropZone.innerHTML = "Перетаскивайте блоки сюда"
            document.getElementById("submitButton").classList.remove("wrongAnswer");
            document.getElementById("submitButton").classList.remove("rightAnswer");

        }
        else {
            document.getElementsByClassName("arrowLeftTest")[0].classList.add("hidden");

        }
        if (numOfTest === props.list.length - 1){
            document.getElementsByClassName("arrowRightTest")[0].classList.remove("hidden");
        }
        document.getElementsByClassName("page")[0].classList.remove("rightAnswerBg");
        document.getElementsByClassName("page")[0].classList.remove("wrongAnswerBg");
        setRightAnswer(false);


    }

    useEffect(() => {
        setDroppedItems([]);
    }, [numOfTest]);

    const checkResult = () =>{
        let sent = "";
        for(let i=0; i<droppedItems.length; i++){
            sent += droppedItems[i].name;
        }
        if(sent === props.list[numOfTest][1]){
            console.log("pass");
            document.getElementById("submitButton").classList.add("rightAnswer");
            document.getElementById("submitButton").classList.remove("wrongAnswer");
            document.getElementsByClassName("page")[0].classList.remove("wrongAnswerBg");
            document.getElementsByClassName("page")[0].classList.add("rightAnswerBg");
            setRightAnswer(true);

            if (!(numOfTest in answers)) {
                answers.push({
                    id:numOfTest,
                    answ: "r",
                })
                setAnsw(answers);
            }
            console.log(answers);
        }
        else{
            document.getElementById("submitButton").classList.add("wrongAnswer");
            document.getElementsByClassName("page")[0].classList.add("wrongAnswerBg");
            console.log("not pass");
            console.log(sent);
            console.log(props.list[numOfTest][1]);
            setRightAnswer(false);

            if (!(numOfTest in answers)) {
                answers.push({
                    id:numOfTest,
                    answ: "w",
                })
                setAnsw(answers);
            }

        }

    }

    const GameField = (num) => {
        return(
                <div className="GameFrame">
                    <div>
                        <div onClick={Prev} className={Number(num)===0 ? "arrowLeftTest hidden" : "arrowLeftTest"}>
                            <img src="/images/arrowLeft.png" alt="arrow_left_button"/>
                        </div>
                    </div>
                    <div className="Game1MainField">

                        <h1>"{props.list[num][2]}"</h1>

                        <div className="Game1page">
                            <div style={{padding: '0.5vw'}}>
                                <h2>Переведите предложение. Расположите слова в правильном порядке</h2>
                                <div className="TestDrag">
                                    {props.list[num][0].map((i, index) => (
                                        <DragItem key={index} name={i} />
                                    ))}
                                </div>
                            </div>

                            <div className="Drop">
                                <DropZone onDrop={handleDrop} />

                                {droppedItems.map((i, index) => (
                                    <div className={rightAnswer ? "DropElementAfter" : "DropElement"}
                                        key={i.name}>
                                        <p style={{margin:'0px'}}>{i.name}</p>
                                        <button className="clictDeleteBlock" onClick={
                                            () => handleRemoveItem(index)}>
                                            Удалить
                                        </button>
                                    </div>
                                ))}
                                
                            </div>
                        </div>

                    </div>

                    <div>
                        <div onClick={Next} className="arrowRightTest">
                            <img src="/images/arrowRight.png" alt="arrow_right_button"/>
                        </div>
                    </div>
                    <div></div>
                    <div id="submitButton" className="game1SubmitButton">
                        <button className="button" onClick={checkResult}>Ответить</button> 
                    </div>
                    <div></div>

                </div>
        )
    }

    if (testState){
        return (
            <div className="page">
                <h1>
                    Игра "Составь предложения"
                </h1>

                <DndProvider  backend={HTML5Backend}>
                    {GameField(numOfTest)}      
                </DndProvider>
                
            </div>
        );
    }

    const Results = () =>{
        let r=0;
        for(let i=0; i<answers.length; i++){
            if (answers[i].answ==="r") r++;
        }
        return r +"/"+ props.list.length;
    }   

    return (
        <div className="page">
            <h1>Игра "Составь предложение"</h1>

            <div className="endOfTest">
                <small><small>Вы прошли игру "Составь предложения"</small></small>
            </div>

            <div className = "results">
                Вы набрали <Results/> баллов! <Link to="/game1"> <span onClick = "window.location.reload()" > Пройти еще раз? </span> </Link>

            </div>
        </div>
    )
};

export default Game1;

