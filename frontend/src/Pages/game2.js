import './game2.css';
import React, { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { Link } from "react-router-dom";


const ItemType = 'WORD';

const words = [
    { id: 1, russian: 'оно', chinese: '它' },
    { id: 2, russian: 'завтра', chinese: '明天' },
    { id: 3, russian: 'кушать', chinese: '吃' },
    { id: 4, russian: 'купить', chinese: '买' },
    { id: 5, russian: '菜', chinese: 'овощи' },
    { id: 6, russian: '票', chinese: 'билет' },
    { id: 7, russian: '钱', chinese: 'деньги' },
    { id: 8, russian: '中国', chinese: 'Китай' },
    { id: 9, russian: '喜欢', chinese: 'нравиться' },
    { id: 10, russian: 'острый', chinese: '辣' },
    { id: 11, russian: '点(菜)', chinese: 'заказывать' },
    { id: 12, russian: 'я', chinese: '我' },
  ];
  
  const DraggableWord = ({ word }) => {
    const [, drag] = useDrag(() => ({
      type: ItemType,
      item: { id: word.id, chinese: word.chinese },
    }));
  
    return (
      <div
        ref={drag} className="DragObjectGame2"
      >
        {word.chinese}
      </div>
    );
  };
  
  const DropArea = ({ russianWord, onDrop, droppedWords, setDroppedWords, checkResult, checkPressed}) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemType,
      drop: (item) => {
        // Проверяем, есть ли уже слово в этой области
        if ((!droppedWords[russianWord] || droppedWords[russianWord].length === 0) ) {
            onDrop(item);
        } else {
            // Если в области уже есть слово, игнорируем новую попытку
            console.log(`В этой области уже есть слово: ${droppedWords[0]}`);
        }
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }));

    const isCorrect = checkResult[russianWord];
  
    let backgroundColor = checkPressed === true
        ? isCorrect === true
            ? 'lightgreen'
            : 'lightcoral'
        : isOver ? 'lightyellow' : 'transparent';
    

    const handleRemove = (chineseWord) => {
        setDroppedWords((prev) => ({
            ...prev,
            [russianWord]: prev[russianWord].filter(word => word !== chineseWord),
        }));
        

    };
  
    return (
      <div
        ref={drop}

        className="DropZoneGame2"
        style={{
          
            backgroundColor: backgroundColor,

        }}
      >
          {droppedWords.map((word, index) => (
            <div key={index} className="DropZoneGameElement2">
              {word}
              <button onClick={() => handleRemove(word)} style={{fontSize: "1vw", backgroundColor: "transparent", border:"1px solid transparent" }}>
                            Удалить
                        </button>
            </div>
          ))}
      </div>
    );
  };

  
const Game2 = () => {
    const [droppedWords, setDroppedWords] = useState({});
    const [checkResult, setCheckResult] = useState({});
    const [checkPressed, setCheckPressed] = useState(false);
    const [numOfTest, setTestNum] = React.useState(0);
    const [testState, setTestState ] = React.useState(true);
    const [dropItems, setDropItems] = React.useState(words.slice(0, 4).sort(() => Math.random() - 0.5))

    const Next =(event)=>{
        console.log(numOfTest);
        if (numOfTest <words.length/4 - 1){
            setCheckPressed(false);
            setDropItems(words.slice((numOfTest + 1)*4, (numOfTest + 2)*4).sort(() => Math.random() - 0.5));
            setTestNum(numOfTest + 1);
        }
        else if(numOfTest === words.length/4) {
            console.log("hi");
            setDropItems(words.slice((numOfTest + 1)*4, (numOfTest + 2)*4).sort(() => Math.random() - 0.5));
            setTestNum(numOfTest + 1);
            setCheckPressed(false);
        }
        else {
            setTestState(false)
            console.log("nehi");

        }
    }
    
    const Prev =(event)=>{
        if (numOfTest > 0) {
            setDropItems(words.slice((numOfTest - 1)*4, (numOfTest)*4).sort(() => Math.random() - 0.5));
            setTestNum((numOfTest - 1));
            setCheckPressed(false);

        }
        else {
            document.getElementsByClassName("arrowLeftTest")[0].classList.add("hidden");
            setCheckPressed(false);

        }
        if (numOfTest === words.length - 1){
            document.getElementsByClassName("arrowRightTest")[0].classList.remove("hidden");
            
        }
    }


  
    const handleDrop = (item, russianWord) => {
        // Проверяем, существует ли ключ для russianWord
        if (!droppedWords[russianWord]) {
            // Если нет, инициализируем его как пустой массив
            setDroppedWords(prev => ({
                ...prev,
                [russianWord]: [item.chinese], // добавляем новое слово
            }));
        } else {
            // Если существует и длина равна 0, добавляем слово
            if (droppedWords[russianWord].length === 0) {
                setDroppedWords(prev => ({
                    ...prev,
                    [russianWord]: [item.chinese], // добавляем новое слово
                }));
            } else {
                console.log(`В этой области уже есть слово: ${droppedWords[russianWord][0]}`);
            }
        }
    };
  
    const handleCheck = () => {
      const results = {};
      words.forEach((word) => {
        const lastDroppedWord = droppedWords[word.russian]?.[droppedWords[word.russian].length - 1];
        results[word.russian] = lastDroppedWord === word.chinese ? true : false;
      });
      setCheckResult(results);
      setCheckPressed(true);

    };

    const GameField = (num) => {
        return(
            <div className="GameFrame2">
                <div>
                    <div onClick={Prev} className={Number(num)===0 ? "arrowLeftTest hidden" : "arrowLeftTest"}>
                        <img src="/images/arrowLeft.png" alt="arrow_left_button"/>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '35vw', margin: 'auto' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{fontSize:"2vw"}}>Слово</h3>
                         <div className="wordsColumnGame2">
                         {words.slice(num*4, (num + 1)*4).map((word) => (
                            <div className="wordsColumnElementGame2" key={word.id}>
                                {word.russian}
                            </div>
                        ))}
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{fontSize:"2vw"}}>Перевод</h3>
                        <div className="transColumnGame2">
                        {words.slice(num*4, (num + 1)*4).map((word) => (
                            <DropArea
                            key={word.id}
                            russianWord={word.russian}
                            onDrop={(item) => handleDrop(item, word.russian)}
                            droppedWords={droppedWords[word.russian] || []}
                            setDroppedWords={setDroppedWords}
                            checkResult={checkResult}
                            checkPressed={checkPressed}
                            />
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

                <div style={{textAlign: 'center', fontSize: '2vw'}}>
                    <br/>
                    <div className="DropListGame2">
                    {dropItems.map((word) => (
                        <DraggableWord key={word.id} word={word} />
                    ))}
                    </div>
                </div>

                <div></div>
                
                <div></div>
                <div className="game2SubmitButton">
                    <button onClick={handleCheck} className="button">Проверить</button>
                </div>
                <div></div>
            </div>
        )
    }


    if (testState){
        return (
            <div className="page">
                <h1>
                    Игра "Найди перевод слова"
                </h1>

                <DndProvider  backend={HTML5Backend}>
                    {GameField(numOfTest)}      
                </DndProvider>
                
            </div>
        );
    }

    const Results = () =>{
        let r = Object.values(checkResult).filter(value => value === true).length;
        return r +"/"+ words.length;
    }  
  

  return (
    <div className="page">
            <h1>Игра ""Найди перевод слова"</h1>

            <div className="endOfTest">
                <small><small>Вы прошли игру ""Найди перевод слова"</small></small>
            </div>

            <div className = "results">
                Вы набрали <Results/> баллов! <Link to="/game2"> <span onClick = "window.location.reload()" > Пройти еще раз? </span> </Link>

            </div>

        </div>
  );
};

export default Game2;