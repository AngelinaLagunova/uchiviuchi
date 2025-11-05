import { Link } from "react-router-dom";

function GamesMenu() {
  return (
    <>
      <div className="page">
        <div className="mainHeader">
        <small><small><small>Игры для закрепления материала</small></small></small>
        </div>
        <div className="main">

          <div className="wrap"><Link to="/game1">
              <button className="button">Игра "Составь предложения"</button></Link></div>
              
          <div className="wrap"><Link to="/game2">
              <button className="button">Игра "Найди перевод слова"</button></Link></div>

        </div>
      </div>
  </>
  );
}

export default GamesMenu;
