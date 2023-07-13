import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import HorizontalDivider from "./HorizontalDivider";

export default function PortfolioDetails({ year, project, closeModal }) {
  const { cardTitle, fullDesc, galleryImgPaths, demoUrl, repoUrl, tags } =
    project;
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);

  return (
    <div
      className={`portfolio-details ${
        isGalleryExpanded ? "expanded-gallery" : ""
      }`}
    >
      <ImageGallery
        images={galleryImgPaths}
        isGalleryExpanded={isGalleryExpanded}
        setIsGalleryExpanded={setIsGalleryExpanded}
      />
      <div className="portfolio-details-contents">
        <h1>{cardTitle}</h1>
        <h4 className="lighter-text">{year}</h4>
        <HorizontalDivider />
        <div className="portfolio-details-description">
          {fullDesc.map((desc) => (
            <p key={desc.slice(0, 5)}>{desc}</p>
          ))}
        </div>
        <div className="portfolio-details-btn-group">
          {demoUrl ? (
            <Button onClick={() => window.open(demoUrl, "_blank")}>
              View demo
            </Button>
          ) : (
            <Button isDisabled={true}>Demo unavailable</Button>
          )}
          {repoUrl ? (
            <Button onClick={() => window.open(repoUrl, "_blank")}>
              View repo
            </Button>
          ) : (
            <Button isDisabled={true}>Repo unavailable</Button>
          )}
          <Button onClick={closeModal}>Close</Button>
        </div>
      </div>
    </div>
  );
}

function ImageGallery({ images, isGalleryExpanded, setIsGalleryExpanded }) {
  const [currentImg, setCurrentImg] = useState(0);
  const numImages = images.length;
  const imageCarouselRef = useRef(null);

  function scrollToImage(image) {
    let imageCarousel = imageCarouselRef.current;
    imageCarousel.scrollTo(imageCarousel.clientWidth * image, 0);
  }

  function handleGalleryExpand() {
    setIsGalleryExpanded((s) => !s);
    // Wait for transition to finish then readjust image
    setTimeout(() => scrollToImage(currentImg), 200);
  }

  useEffect(() => {
    scrollToImage(currentImg);
    console.log("scroll");
  }, [currentImg, imageCarouselRef]);

  return (
    <div className="image-gallery">
      <GalleryButtonExpand
        isGalleryExpanded={isGalleryExpanded}
        onExpand={handleGalleryExpand}
      />
      {numImages > 1 ? (
        <>
          <GalleryButtonLeft
            numImages={numImages}
            setCurrentImg={setCurrentImg}
          />
          <GalleryButtonRight
            numImages={numImages}
            setCurrentImg={setCurrentImg}
          />
          <GalleryIndicator
            numImages={numImages}
            currentImg={currentImg}
            setCurrentImg={setCurrentImg}
          />
        </>
      ) : null}

      <div ref={imageCarouselRef} className="image-carousel">
        {images.map((img) =>
          img.endsWith(".mp4") ? (
            <video muted autoPlay loop key={img}>
              <source src={img} type="video/mp4"></source>
            </video>
          ) : (
            <img key={img} src={img}></img>
          )
        )}
      </div>
    </div>
  );
}

function GalleryButtonExpand({ isGalleryExpanded, onExpand }) {
  return (
    <div className="gallery-btn-toggle-expand" onClick={onExpand}>
      <i
        className={`bi bi-arrows-angle-${
          isGalleryExpanded ? "contract" : "expand"
        }`}
      ></i>
    </div>
  );
}

function GalleryButtonLeft({ numImages, setCurrentImg }) {
  return (
    <div
      className="gallery-btn-left"
      onClick={() =>
        setCurrentImg((currImg) => {
          let tempImg = currImg - 1;
          return tempImg < 0 ? numImages - 1 : tempImg;
        })
      }
    >
      <i className="bi bi-caret-left-fill"></i>
    </div>
  );
}

function GalleryButtonRight({ numImages, setCurrentImg }) {
  return (
    <div
      className="gallery-btn-right"
      onClick={() =>
        setCurrentImg((currImg) => {
          let tempImg = currImg + 1;
          return tempImg > numImages - 1 ? 0 : tempImg;
        })
      }
    >
      <i className="bi bi-caret-right-fill"></i>
    </div>
  );
}

function GalleryIndicator({ numImages, currentImg, setCurrentImg }) {
  return (
    <div className="gallery-indicator">
      <div className="wrapper">
        {Array.from({ length: numImages }, (_, i) => 0 + i).map((num) => (
          <IndicatorDot
            key={num}
            active={num === currentImg}
            onClick={() => setCurrentImg(num)}
          />
        ))}
      </div>
    </div>
  );
}

function IndicatorDot({ active, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        lineHeight: "8px",
        color: `${active ? "white" : "rgba(0,0,0,0.4)"}`,
        cursor: "pointer",
      }}
    >
      &bull;
    </span>
  );
}
