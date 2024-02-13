import React from "react";
import MainNavigation from "../components/MainNavigation";
import Footer from "./Footer";
import "./ErrorStyle.css";

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <section class="page_404">
          <div class="container">
            <div class="row">
              <div class="col-sm-12 ">
                <div class="col-sm-10 col-sm-offset-1  text-center">
                  <div class="four_zero_four_bg">
                    <h1 class="text-center ">404</h1>
                  </div>

                  <div class="contant_box_404">
                    <h3 class="h2">Изглежда сте се изгубили</h3>

                    <p>Страницата която търсите не е налична!</p>

                    <a href="/" class="link_404 btn-hover.color-5">
                      Върни се в Начало
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <h1>An error occured!</h1>
        <p>Could not find this page!</p> */}
      </main>
      <Footer />
    </>
  );
}

export default ErrorPage;
