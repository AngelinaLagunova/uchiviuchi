import './words.css';
import React from 'react'; 
import { Link } from "react-router-dom";


const Card = (props)=>{
    

    // состояни и функция для контроля переворота мини-карт, хранится массив из индексов
    const [fleshMini, setFleshMini] = React.useState([]);

    const MiniFlesh = (event) =>{
        let str_index = String(event.target.parentNode.id);
        let index =  Number(str_index.substring(8));

        if (fleshMini.indexOf(index)===-1){
            setFleshMini(fleshMini => [...fleshMini,index]);
        }
        else {
            setFleshMini(fleshMini => fleshMini.filter(item => item !== index));
        }

    }

    const MiniCardFlesh = (props) =>{
        if (fleshMini.indexOf(Number(props.id[8]))===-1){
            return(
                <>
                <div className="charMin" >{props.item.char}</div>
                <div className="phenMin">{props.item.phen}</div>
                </>
            )
        }
        return(
            <div className="rusTransMin">{props.item.trans}</div>
        )
    }
    // генерация сразу всех мини-карт

    const MiniCardsGeneration = props.words.map((item,index) =>
        <div id={"miniCard" + index} onClick={MiniFlesh} className="miniCard" key={index} > 
            <MiniCardFlesh item={item} id={"miniCard" + index}/>
         </div>
    )
    
   
    
    const BigCardFlesh = (props) => {

        if (props.flesh){
        return(
            <>  
            {/* сторона с иероглифами */}
            <div className="cardHeader">
                <div className="translate"><img src="/images/translate.png" alt="translate_button"/></div>
                <div className="star"><img src="/images/star.png" alt="add_to_list_button"/></div>
            </div>
                <div>
                    <div className="rusTrans">{props.words[Number(props.num)].trans}</div>
                    <div className="pictWord"> <img src={props.words[Number(props.num)].pict} className="zoom-effect" alt={props.num + "words_picture"}/></div>
                </div>
                <div></div>
                <div className="count">{Number(props.num)+1}/{props.words.length}</div> 
            </>
            )
        }
        return(
            <>
            {/* сторона с переводом */}
                <div className="cardHeader">
                    <div className="translate"><img src="/images/translate.png" alt="translate_button"/></div>
                    <div className="star"><img src="/images/star.png" alt="add_to_list_button"/></div>
                </div>
                <div className="char">{props.words[Number(props.num)].char}</div>
                <div className="sound"><img src="/images/sound.png" alt="sound_button"/></div>
                <div className="rusTrans">{props.words[Number(props.num)].phen}</div>
                <div></div>
                <div className="count">{Number(props.num)+1}/{props.words.length}</div>
            </>
    
        )
    }
   

    //состояние и функция для контроля переворота карт
    const [sideOfCard, setFlesh] = React.useState(false);

    const fleshCard = (event) =>{
        setFlesh(!sideOfCard);
    }

    //состояние для пролистывания карт, хранится индект карты
    const [numOfCard, setNum] = React.useState(0);

    //перелистывание на следующую карточку
    const nextCard = (event) =>{
        if (numOfCard < props.words.length - 1){
            setNum(numOfCard + 1);
            setFlesh(false);
        }
        //контроль исчезновения правой стрелочки появления кнопки "пройти тест"
        else {
            document.getElementsByClassName("arrowRight")[0].classList.add("hidden");
            document.getElementById("testButton2").classList.remove("hidden");
        }
        //контроль появления левой стрелочки
        if (numOfCard > -1) {
            document.getElementsByClassName("arrowLeft")[0].classList.remove("hidden");
        }

    }

    //перелистывание на предыдущую карточку
    const prevCard = (event) => {
        if (numOfCard > 0) {
            setNum((numOfCard - 1));
            setFlesh(false);
        }
        // контроль исчезновения левой стрелочки 
        if (numOfCard < 2){ 
            document.getElementsByClassName("arrowLeft")[0].classList.add("hidden");
        }
        // контроль появления правой стрелочки и исчезновения кнопки "пройти тест"
        if (numOfCard === props.words.length - 1){
            document.getElementsByClassName("arrowRight")[0].classList.remove("hidden");
            document.getElementById("testButton2").classList.add("hidden");
        }
        
    }

    if(props.mode==="Показать все"){
        return(
            <>
            {/* BigCardGeneration */}
            <div>
                <div onClick={prevCard} className="arrowLeft hidden">
                    <img src="/images/arrowLeft.png" alt="arrow_left_button"/>
                </div>
            </div>

            <div onClick = {fleshCard} className="bigCard"> 
                <BigCardFlesh words={props.words} num={numOfCard} flesh={sideOfCard}/> 
            </div>

            <div>
                <div onClick={nextCard} className="arrowRight">
                    <img src="/images/arrowRight.png" alt="arrow_right_button"/>
                </div>

                <Link id="testButton2" className="hidden testButton" to={props.links.test}>
                    <button className="button">Пройти тест</button>
                </Link>
            </div>
            </>
            
        )
    }
    return(
        <>
        {MiniCardsGeneration}  
        </>
    )
}




const Vocabulary =(props)=>{

    // состояние кнопки смены страниц
    const [modeOfWatch, setMode] = React.useState("Учить");

    const SetMode = (event) =>{
        setMode (event.target.innerHTML === "Показать все" ? "Учить" : "Показать все")
    }

    return(
        
        <div className="page">
            
            <div className="wordPage">

                <div className="words">
                    <h1>{props.links.title} <br/> {props.links.title2}</h1>
                </div>

                {/* кнопка смены страниц: Учиться или Посмотреть все */}
                <div className="wordsButton">
                        <button onClick ={SetMode} className="button">{modeOfWatch}</button>
                </div>


                <div className="wordsButton">
                    <Link to={props.links.test}>
                        <button className="button">Пройти тест</button>
                    </Link>
                </div>

                {/* блок с карточками: все или по одной */}

                <Card words={props.words} mode={modeOfWatch} links={props.links}/>
                
            </div>
        </div>
  
    )
}

export default Vocabulary