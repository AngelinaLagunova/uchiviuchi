import React from 'react';
import { useParams } from 'react-router-dom';
import provinciesData from './provinciesData.json';
import ReactDOM from 'react-dom/client';
import { useTransition, animated } from 'react-spring';
import './index.css';
import './buttons.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import Lk from "./Pages/Lk.js";
import MainMenu from "./Pages/mainmenu.js";
import PreMain from "./Pages/preMain.js";
import Map from "./Pages/map.js";
import Location from "./Pages/location.js";
import Vocabulary from "./Pages/vocabulary.js";
import VocabList from "./Pages/vocabList.js";
import TestVocab from "./Pages/testVocab.js";
import Grammar from "./Pages/grammar.js";
import BaseVocab from "./Pages/baseVocab.js";
import PreGrammar from "./Pages/preGramma.js";
import Game1 from "./Pages/game1.js";
import Game2 from "./Pages/game2.js";
import GamesMenu from "./Pages/gamesMenu.js";
import AboutUs from "./Pages/aboutUs.js";



function shuffleArray(arr) {
        let array = arr.slice();
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
        }

function generateQuizItems(data) {
    const allTranslations = data.map(item => item.trans);

    return data.map(item => {
        const correct = item.trans;
        const incorrect = shuffleArray(allTranslations.filter(t => t !== correct)).slice(0, 2);
        const options = shuffleArray([correct, ...incorrect]);

        const rightVar = `var${options.indexOf(correct) + 1}`;

        return {
        char: item.char,
        phen: item.phen,
        pict: item.pict,
        var1: options[0],
        var2: options[1],
        var3: options[2],
        rightVar: rightVar
        };
    });
    }


function ProvincePage() {
  const { provinceName, section } = useParams();

  const provincData = provinciesData[provinceName];

  if (!provincData) {
    return <div>Данные не найдены</div>;
  }

  switch (section) {
    case 'location':
      return <Location name={provincData.name} info={provincData.info} links={provincData.links}/>
    case 'food':
      return <Vocabulary words={provincData.vocabFood} links={provincData.foodLinks} />;
    case 'sights':
      return <Vocabulary words={provincData.vocabSights} links={provincData.sightsLinks} />;
    case 'foodTest':
      return <TestVocab words={generateQuizItems(provincData.vocabFood)} links={provincData.foodTestLinks} />;
    case 'sightsTest':
      return <TestVocab words={generateQuizItems(provincData.vocabSights)} links={provincData.sightsTestLinks} />;
    default:
      return <div>Данные не найдены</div>;
  }
}

const nameData = Object.fromEntries(
  Object.entries(provinciesData).map(([key, value]) => [key, value.name])
);

const root = ReactDOM.createRoot(document.getElementById('root'));

const game1Props = [[["那个饭馆","不","做东安子鸡"],"那个饭馆不做东安子鸡", "Тот ресторан не готовит курицу Дунъань."],
[["这个菜","是","臭豆腐"], "这个菜是臭豆腐", "Это блюдо - вонючий тофу."], 
[["昨天","他/她点了", "毛氏","红烧肉"], "昨天他/她点了毛氏红烧肉", "Вчера он/она заказал(а) тушенное мясо по рецепту семьи Мао."], 
]

const BaseGifs = [["gif1.gif"], ["gif2.gif"], ["gif3.gif"], ["gif1.gif", "gif4.gif"], ["gif5.gif"], ["gif6.gif"],["gif5.gif", "gif4.gif"], ["gif7.gif"], ["gif7.gif", "gif4.gif"], ["gif8.gif", "gif9.gif"], ["gif10.gif", "gif9.gif"], ["gif11.gif", "gif9.gif"], ["gif12.gif", "gif9.gif"], ["gif13.gif", "gif9.gif"], ["gif14.gif", "gif15.gif"], ["gif16.gif", "gif15.gif"], ["gif17.gif", "gif15.gif"], ["gif18.gif", "gif19.gif"], ["gif20.gif"], ["gif21.gif"], ["gif22.gif"], ["gif23.gif"], ["gif24.gif"], ["gif25.gif"], ["gif26.gif"], ["gif27.gif"], ["gif28.gif"], ["gif29.gif"], ["gif30.gif"], ["gif31.gif"], ["gif32.gif", "gif33.gif"], ["gif34.gif", "gif35.gif"], ["gif36.gif", "gif37.gif"], ["gif38.gif", "gif39.gif"], ["gif40.gif", "gif41.gif"]]

const grammarChar = [[{"char":"这个菜", "color":"white"},{"char":"是", "color":"grey"},{"char":"臭豆腐","color":"white"}], 
[{"char":"昨天", "color":"grey"},{"char":"他/她点了毛氏红烧肉", "color":"white"}], 
[{"char":"那个饭馆", "color":"white"},{"char":"不", "color":"grey"},{"char":"做东安子鸡","color":"white"}],
[{"char":"以前你", "color":"white"},{"char":"吃过", "color":"grey"},{"char":"湘西酸肉吗？","color":"white"}],
[{"char":"我", "color":"white"},{"char":"喜欢", "color":"grey"},{"char":"剁椒鱼头","color":"white"}],
[{"char":"他们", "color":"white"},{"char":"都", "color":"grey"},{"char":"买茅台酒","color":"white"}],
[{"char":"丝娃娃", "color":"white"},{"char":"真", "color":"grey"},{"char":"好吃","color":"white"}],
[{"char":"肠旺面", "color":"white"},{"char":"比", "color":"grey"},{"char":"怪噜炒饭辣","color":"white"}],
[{"char":"你买了", "color":"white"},{"char":"什么", "color":"grey"},{"char":"纪念品?","color":"white"}],
[{"char":"你看过黄果树瀑布", "color":"white"},{"char":"吗?", "color":"grey"}],
[{"char":"我想", "color":"white"},{"char":"去", "color":"grey"},{"char":"梵净山","color":"white"}],
[{"char":"毕节织金洞票是", "color":"white"},{"char":"多少", "color":"grey"},{"char":"钱?","color":"white"}],
[{"char":"你的中国旅行", "color":"white"},{"char":"怎么样?", "color":"grey"}]];

const grammarTrans = [["Это блюдо - вонючий тофу."],["Вчера он/она заказал(а) тушенное мясо по рецепту семьи Мао."], ["Тот ресторан не готовит курицу Дунъань."], ["Раньше ты пробовал мясо в кисло-сладком соусе?"], ["Мне нравится рыбья голова в хлопьях красного перца."],["Они все купили Маотай."], ["Сивава очень вкусные."], ['Лапша со свиными кишками острее, чем Гуайлу.'], ["Ты купил какие сувениры?"], ["Ты видел водопады Хуангошу?"], ["Я хочу пойти в горы Фаньцзиншань."], ["Сколько стоит билет в карстовые пещеры Чжицзинь в Бицзе?"], ["Как прошла твоя поездка в Китай?"]];

const grammar = ["zhè gè cài shì chòudòufu.","zuótiān tā/tā diǎn le máoshì hóngshāoròu.", "nà ge fànguǎn bù zuò dōng ān zǐ jī.", "yǐqián nǐ chī guò xiāngxī suānròu mǎ?", "wǒ xǐhuan duòjiāo yútóu.", "tā men dōu mǎi máo tái jiǔ.", "sī wá wá zhēn hào chī.", "cháng wàng miàn bǐ guài lū chǎo fàn là.", "nǐ mǎi le shénme jìniànpǐn?", "nǐ kàn guò huáng guǒ shù pù bù ma?", "wǒ xiǎng qù fàn jìng shān", "bì jié zhī jīn tóng piào shì duō shao qián?", "nǐ de zhōngguó lǚxíng zěnmeyàng?"];

const grammarLinks = {"test":"/grammar", "title": "Путешественник"};

const ThemesSidnav = [{"href":"/main", "text":"Лексика"}];
const BaseVocabSidnav = [{"href":"/baseVocab", "text":"Базовый словарь"}];
const PreGrammarSidnav = [{"href":"/preGrammar", "text":"Грамматика"}];
const GamesMenuSidnav = [{"href":"/gamesMenu", "text":"Игры"}];
const AboutUsSidnav = [{"href":"/aboutUs", "text":"О проекте"}];
const HomeSidnav = [{"href":"/home", "text":"Главная"}];
const LkSidnav = [{"href":"/lk", "text":"Личный кабинет"}];
const VocabListSidnav = [{"href":"/vocabList", "text":"Словарь"}];
const MapSidenav = [].concat(ThemesSidnav, [{"href":"/map", "src":"mapicon.png"}]);
const GrammarSidenav = [].concat(PreGrammarSidnav,[{"href":"/grammar", "text":"Путешестве- нник"}]);
const Game1Sidenav = [].concat(GamesMenuSidnav, [{"href":"/game1", "text":"Составь предложения"}])
const Game2Sidenav = [].concat(GamesMenuSidnav, [{"href":"/game2", "text":"Найди перевод слова"}])


function createProvinceSidenavs(provinceKey, provinceData) {
  const name = provinceData.name.name;
  const nameRu = provinceData.name.nameRu;
  const slug = provinceKey;

  const links = provinceData.links || {};
  const foodLinks = provinceData.foodLinks || {};
  const sightsLinks = provinceData.sightsLinks || {};
  const locationLink = provinceData.foodTestLinks.location || {};

  const provinceSidenav = [].concat(
    MapSidenav,
    [{ href: locationLink || `/province/${slug}/location`, text: nameRu }]
  );

  const provinceFoodSidenav = [].concat(
    provinceSidenav,
    [{ href: links.food || `/province/${slug}/food`, text: "Блюда" }]
  );

  const provinceSightsSidenav = [].concat(
    provinceSidenav,
    [{ href: links.sights || `/province/${slug}/sights`, text: "Достоприме- чательности" }]
  );

  const provinceTestFoodSidenav = [].concat(
    provinceFoodSidenav,
    [{ href: foodLinks.test || `/province/${slug}/foodTest`, text: "Тест" }]
  );

  const provinceTestSightsSidenav = [].concat(
    provinceSightsSidenav,
    [{ href: sightsLinks.test || `/province/${slug}/sightsTest`, text: "Тест" }]
  );

  console.log(provinceSidenav)
  return {
    [`${name}Sidenav`]: provinceSidenav,
    [`${name}FoodSidenav`]: provinceFoodSidenav,
    [`${name}SightsSidenav`]: provinceSightsSidenav,
    [`${name}TestFoodSidenav`]: provinceTestFoodSidenav,
    [`${name}TestSightsSidenav`]: provinceTestSightsSidenav,
  };
}

const allSidenavs = {};
const dynamicSidebar = {"/map":MapSidenav, "/grammar":GrammarSidenav, "/main":ThemesSidnav, "/baseVocab":BaseVocabSidnav, "/preGrammar":PreGrammarSidnav, "/gamesMenu":GamesMenuSidnav,"/aboutUs":AboutUsSidnav, "/game1": Game1Sidenav, "/game2":Game2Sidenav, "/home": HomeSidnav, "/lk": LkSidnav, "/vocabList":VocabListSidnav};

for (const provinceKey in provinciesData) {
  if (!provinciesData.hasOwnProperty(provinceKey)) continue;

  const provinceData = provinciesData[provinceKey];
  const navs = createProvinceSidenavs(provinceKey, provinceData);

  Object.assign(allSidenavs, navs);

  const name = provinceData.name.name;
  const locationLink = provinceData.foodTestLinks.location || {};
  const links = provinceData.links || {};
  const foodLinks = provinceData.foodLinks || {};
  const sightsLinks = provinceData.sightsLinks || {};

  if (locationLink) dynamicSidebar[locationLink] = navs[`${name}Sidenav`];
  if (links.food) dynamicSidebar[links.food] = navs[`${name}FoodSidenav`];
  if (links.sights) dynamicSidebar[links.sights] = navs[`${name}SightsSidenav`];
  if (foodLinks.test) dynamicSidebar[foodLinks.test] = navs[`${name}TestFoodSidenav`];
  if (sightsLinks.test) dynamicSidebar[sightsLinks.test] = navs[`${name}TestSightsSidenav`];
}

function Sidebar() {
  
    const listImg = ["home", "lk", "vocabList"];
    const listImgHints = ["Главная", "Личный кабинет", "Словарь"];

    const SideImages =listImg.map((img, index) =>
      <Link to={"/"+img} key={index}><img key={index} src={"/images/" + img +".png"} title={listImgHints[index]} alt="icon_picture"/></Link>
    );

    const SideDynanic = () => {

      if (location.pathname in dynamicSidebar)
      return (
        dynamicSidebar[location.pathname].map((item,index) => item.href==="/map" ? <Link to={item.href} key={index}><img src={"/images/" + item.src} key={index}alt="icon_picture"/></Link> : <Link to={item.href} key={index}><p key={index}>{item.text}</p></Link>
         )
      )
      return (
        <>
        </>
      )
    };

  const location = useLocation();
  const transitions = useTransition(location,{key:location => location.pathname,
    
      from:{
        opacity:0,
      },
      enter:{
        opacity:1,

      },
      leave:{
        opacity:0,

      },
    }
  );

    return(
      <>
      <div className="sidenav">
        <Link to="/aboutUs" key="aboutUs" title="О проекте">УчиВыучи</Link>
        {SideImages}
        <hr/>
        <SideDynanic/>
      </div>
      {transitions((props, location)=>(
        <animated.div style={props}>
        <Routes location={location}>
            <Route exact path="/home" element={<PreMain/>}/>
            <Route exact path="/main" element={<MainMenu/>}/>
            <Route exact path="/" element={<PreMain/>}/>
            <Route exact path="/aboutUs" element={<AboutUs/>}/>
            <Route exact path="/lk" element={<Lk/>}/>
            <Route exact path="/vocabList" element={<VocabList/>}/>
            <Route exact path="/map" element={<Map list={nameData}/>}/>
            <Route exact path="/baseVocab" element={<BaseVocab gifs={BaseGifs}/>}/>
            <Route exact path="/preGrammar" element={<PreGrammar/>}/>
            <Route exact path="/gamesMenu" element={<GamesMenu/>}/>
            <Route exact path="/game1" element={<Game1 list={game1Props}/>}/>
            <Route exact path="/game2" element={<Game2 list={game1Props}/>}/>
            <Route exact path="/Grammar" element={<Grammar char={grammarChar} phen={grammar} trans={grammarTrans} links={grammarLinks}/>}/>

            <Route path="/province/:provinceName/:section?" element={<ProvincePage />} />

        </Routes>
        {/* </div> */}
        </animated.div>
        ))}
    </>
    )  
  }



function Content() { 
  return(     
    <Router>
    <Sidebar/>

    </Router>
  ) 
} 

root.render(<Content />)
