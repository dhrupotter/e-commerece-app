import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { imageData } from "./carousel";
import "../Header/Header.css";

const renderSlides = imageData.map((image) => (
  <div key={image.alt} className="carousel-img-container">
    <img src={image.url} alt={image.alt} />
    {/* <p className="legend">{image.label}</p> */}
  </div>
));

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState();

  function handleChange(index) {
    setCurrentIndex(index);
  }
  return (
    <div className="header-section">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        labels={false}
        onChange={handleChange}
        className="carousel-container"
      >
        {renderSlides}
      </Carousel>
      <div className="header-section-text-background">
        <div className="header-section-text">
          <p>
            "Our carefully curated collection offers an array of stunning pieces
            crafted by talented artisans. Discover the joy of collecting and
            bring the allure of ceramic art into your world. Start exploring and
            start creating!"
          </p>
        </div>

        <button>Shop Now</button>
      </div>
    </div>
  );
};

export default Header;
