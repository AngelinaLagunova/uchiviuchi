import './mainmenu.css';
import { Link } from "react-router-dom";

function MainMenu() {
  return (
    <>
      <div className="page">
        <div className="mainHeader" text->
          <small><small><small>Тематические блоки</small></small></small>
        </div>
        <div className="main">
          <div className="wrap"><Link to="/map">
              <button className="button2">Путешествие 旅行</button></Link></div>
          <div className="wrap"><Link to="/main">
              <button className="button2">Второй модуль</button></Link></div>
          <div className="wrap"><Link href="/main">
              <button className="button2">Третий модуль</button></Link></div>
        </div>
      </div>
  </>
  );
}

export default MainMenu;
