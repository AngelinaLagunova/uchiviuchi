import "./testSetting.css";
import React from 'react'; 
import { Link } from "react-router-dom";



const TestSetting = (props) => {


    const [firstType, setFirstType] = React.useState("/images/checkTest.png");
    const [secondType, setSecondType] = React.useState("/images/uncheckTest.png");

    const ChangeTestType = (event) =>{
        let id = Number(event.target.id[0])
        setFirstType(id === 0 ? "/images/checkTest.png" : "/images/uncheckTest.png");
        setSecondType(id === 1 ? "/images/checkTest.png" : "/images/uncheckTest.png");
    }

    return (
        <div className="page">
                <div className ="testSettingPage">
                    <h1>Настройка теста</h1>
                    <div className = "checkTestSetting" >
                        <img onClick={ChangeTestType} id="0test" src={firstType} alt="first_radio_button"/>
                        <p>письменный тест</p>
                    </div>
                    <div className = "checkTestSetting" >
                        <img onClick={ChangeTestType} id="1test" src={secondType} alt="second_radio_button"/>
                        <p>выбор варианта ответа</p>
                    </div>
                    <div className="startTestButton">
                        <Link to={(firstType==="/images/checkTest.png") ? props.links.testVocabWrite : props.links.testVocab}>
                            <button className="button">Начать тест</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default TestSetting