import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import classes from "./Home.module.css";
import Footer from "./Footer";

const HomePage = () => {
  const slides = [
    {
      url: "https://c4.wallpaperflare.com/wallpaper/761/354/456/gift-life-happy-wallpaper-preview.jpg",
      title: "Gift-1",
    },
    {
      url: "https://c0.wallpaperflare.com/preview/632/311/827/gift-box-christmas-present.jpg",
      title: "Gift-2",
    },
    {
      url: "https://wallpapers.com/images/hd/christmas-aesthetic-gifts-on-wood-tgtxag66skesvhzz.jpg",
      title: "Gift-3",
    },
  ];

  const containerStyles = {
    width: "100%",
    height: "680px",
    margin: "0 auto",
  };

  useEffect(() => {
    // JavaScript for scroll animation
    const handleScroll = () => {
      const article = document.querySelector(".main-content");
      const articlePosition = article.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (articlePosition < screenPosition) {
        article.classList.add("active");
      } else {
        article.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <h1>My Home Page</h1> */}
      <div id="img-slider">
        <div style={containerStyles}>
          <ImageSlider slides={slides}></ImageSlider>
        </div>
      </div>
      <p>
        Отиди към <Link to="/categories">списъка за Категории</Link>
      </p>
      <h2>Създаваме висококачествени ръчно изработени подаръци.</h2>
      {/*<section className="homepage-products">
        <div>. </div>
  </section>*/}
      <article className="main-content">
        <h2>Услуги</h2>
        <p>
          Направете всичко възможно за най-доброто представяне на бизнеса си.
          Ние от My3DWorld ще осигурим чрез нашите услуги това да се осъществи и
          да оставим на вас да се фокусирате изцяло върху продукцията си.
          Обработваме широка гама детайли от материали подходящи за механична
          обработка като: Дърво, Алуминий, Карбон, MDF, ПДЧ, Шперплат, ПВЦ,
          Плексиглас, Пенокартон, Полиамид, Полипропилен, Стомана и други. Част
          от услугите ни са свързани с изработване на машини с
          цифрово-програмно-управление(CNC), изработка на 3D принтери,
          производство на механични детайли, гравиране и фрезоване и други.
        </p>
        <h2>Изработване на машини с цифрово-програмно-управление (CNC):</h2>
        <p>
          Модерните системи за цифрово-програмно-управление на обработващи
          машини изразяват най-новите постижения в автоматиката, електрониката,
          информационните технологии и обработката на материали. Основните
          изисквания към тях са високата точност, бързината на обработка,
          надежност, висока повтаряемост на изработените детайли като ние от
          My3DWorld покриваме всички тези изисквания. Машините са с висока
          производителност и могат да се използват в малко и средносерийно
          производство.
        </p>
        <h2>Изработка на 3D принтери:</h2>
        <p>
          3D принтерите са нова генерация уникални машини, които позволяват
          възпроизвеждането на различни предмети от различни материали – от
          всекидневни физически обекти до сложни прототипи, при това на една
          машина. На практика възможностите на 3D принтерите са неограничени и
          затова на този вид принтери се гледа като на следващия голям отрасъл
          на индустрията
        </p>
        <h2>Производство на механични детайли:</h2>
        <p>
          Ако търсите конкурентен, надежден партньор и доставчик, който може да
          се развива според вашите нужди, очаквания и изисквания, то вие сте
          попаднали на правилното място. Специализирани в прецизната механична
          обработка, ние произвеждаме стандартни, сложни стругови и фрезови
          детайли и компоненти. Конкурентните цени, високото качество и точната
          доставка са белезите, с които се отличаваме от останалите.
        </p>
      </article>
      <Footer />
    </>
  );
};

export default HomePage;
