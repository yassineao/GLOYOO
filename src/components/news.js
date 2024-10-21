import React, { useState, useEffect } from "react";
import "../styles/Card.css"

const Carousel = ({ slides }) => {
    
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  

  // Effect to update the progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress === 100) {
        setProgress(0);
        setActiveSlide((prev) => (prev + 1) % slides.length);
      } else {
        setProgress((prev) => prev + 1);
      }
    }, 100); // 100 ms intervals to simulate the progress

    return () => clearInterval(interval);
  }, [progress]);

  // Function to handle click on a post
  const handlePostClick = (index) => {
    if (isDisabled) return;

    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 2500); // Disable for 2.5 seconds

    setProgress(0); // Reset progress
    setActiveSlide(index); // Set the clicked post as active
  };

  return (
    <div className="carousel">
      <div className="progress-bar progress-bar--primary hide-on-desktop">
        <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
      </div>

      <header className="main-post-wrapper">
        <div className="slides">
          {slides.map((slide, index) => (
            <article
              key={index}
              className={`main-post ${
                index === activeSlide ? "main-post--active" : "main-post--not-active"
              }`}
            >
              <div className="main-post__image">
                <img src={slide.imageSrc} alt={slide.altText} loading="lazy" />
              </div>
              <div className="main-post__content">
                <div className="main-post__tag-wrapper">
                </div>
                <h1 className="main-post__title">{slide.title}</h1>
                <a className="main-post__link" href={slide.linkUrl}>
                  <span className="main-post__link-text">{slide.linkText}</span>
                  {slide.linkIcon === "arrow" ? (
                    <svg
                      className="main-post__link-icon main-post__link-icon--arrow"
                      width="37"
                      height="12"
                      viewBox="0 0 37 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 6H36.0001M36.0001 6L31.0001 1M36.0001 6L31.0001 11"
                        stroke="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="main-post__link-icon main-post__link-icon--play-btn"
                      width="30"
                      height="30"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="9"
                        stroke="#C20000"
                        strokeWidth="2"
                      />
                      <path d="M14 10L8 6V14L14 10Z" fill="white" />
                    </svg>
                  )}
                </a>
              </div>
            </article>
          ))}
        </div>
      </header>

      {/* Posts Wrapper */}
      <div className="posts-wrapper hide-on-mobile">
        {slides.map((slide, index) => (
          <article
            key={index}
            className={`post ${index === activeSlide ? "post--active" : ""} ${
              isDisabled ? "post--disabled" : ""
            }`}
            onClick={() => handlePostClick(index)} // Click to go to this post
          >
            <div className="progress-bar">
              <div
                className="progress-bar__fill"
                style={{ width: index === activeSlide ? `${progress}%` : "0%" }}
              ></div>
            </div>
            <header className="post__header">
              <span className="post__tag">{slide.tag}</span>
              <p className="post__published">Date</p>
            </header>
            <h2 className="post__title">{slide.title}</h2>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
