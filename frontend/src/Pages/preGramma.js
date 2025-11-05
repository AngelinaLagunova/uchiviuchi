import { Link } from "react-router-dom";

function PreGrammar() {
  return (
    <>
      <div className="page">
        <div className="mainHeader">
          <small><small>Грамматика</small></small>
        </div>
        <div className="main">
          <div className="wrap"><Link to="/grammar">
              <button className="button">Модуль Путешественник</button></Link></div>
              
          <div className="wrap"><Link to="/preGrammar">
              <button className="button">Модуль Второй</button></Link></div>

          <div className="wrap"><Link to="/preGrammar">
              <button className="button">Модуль третий</button></Link></div>

        </div>
      </div>
  </>
  );
}

export default PreGrammar;
