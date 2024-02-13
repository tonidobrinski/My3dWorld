import React from "react";
import Footer from "./Footer";
import "./AboutUs.css";

function AboutUsPage() {
  return (
    <div className="about-us-page">
      <h1>За нас</h1>
      <div className="about-us-container">
        <div className="about-us-container1 left-content">
          <img
            src="http://my3dworld.bg/wp-content/uploads/elementor/thumbs/DSC_07711-n974qgo7amj16c12x6ujxbaw5mpoiujlbnoj0wxqcs.jpg"
            alt="img"
          />
          <div className="text-container">
            <h2>Кои сме ние?</h2>
            <p>
              My3DWorld предлага първокласен набор от услуги, свързани с
              разкрояване, гравиране, изрязване и фрезоване на детайли със
              сложна форма, изработени с голяма точност и повтаряемост. Предлагаме
              и изработка на професионални обработващи машини, последно поколение,
              с цифрово-програмно-управление (CNC). Екипът ни притежава повече от
              10 години опит, събран с технологичните ни познания, прилагаме за
              удовлетвореността на клиентите ни.
            </p>
          </div>
        </div>
        <div className="about-us-container2 right-content">
          <div className="text-container">
            <h2>Какво целим?</h2>
            <p>
              Изграждането на дългосрочни партньорства базирани на лоялност и
              коректно отношение. Конкуренцията се засилва във всички сфери на
              бизнеса, а малките детайли са тези, които биха ви накарали да
              изпъкнете пред останалите. Именно затова, екипът на My3DWorld е
              винаги на разположение за подобряване на клиентските искания.
              Обратната връзка е важна за нас, за нашето развитие и генерирането
              на нови идеи. Мисията ни е да материализираме идеите ви!
            </p>
          </div>
          <img
            src="http://my3dworld.bg/wp-content/uploads/elementor/thumbs/DSC_07941-ncuzylhs3dxf0s1t67oitrdje3pf7h89ks8zcjlrxo.jpg"
            alt="img"
          />
        </div>
        <div className="about-us-container3 left-content">
          <img
            src="http://my3dworld.bg/wp-content/uploads/elementor/thumbs/DSC_07881-1-n9ns4pl5ozitsaf6408fhm9cpo9zclowe2fj4gnjqk.jpg"
            alt="img"
          />
          <div className="text-container">
            <h2>Какво създаваме?</h2>
            <p>
              Изкуството на бъдещето. Професионално отношение. Оригинална и
              уникална продукция. Символ на иновация и гарантирано качество на
              крайният продукт. Креативност и мотивация. Ние препокриваме всички
              ваши желания на продукцията ви, за да ви донесе увереност, че да е
              покажете пред всички.
            </p>
          </div>
          <div className="text-container">
            <h2>С какво се отличаваме?</h2>
            <p>
              За разлика от други компании, които предлагат единични услуги,
              нашите методи са доказани и са свързани пряко с удовлетвореността
              на крайният потребител. Чрез съвети и качествени идеи можем да ви
              помогнем за това, което искате и да улесним успешното му прилагане.
              Вярваме че качеството е по-силно от количеството.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUsPage;
