import { useEffect, useRef, useState } from "react";
import styles from "./ImageGallery.module.css";

function useImageIndex(initial, numImages, wrap = false) {
  if (initial > numImages - 1) {
    initial = numImages - 1;
  }

  const [indexes, setIndex] = useState({
    prevIndex: null,
    currIndex: initial,
  });

  function next() {
    let prevIndex = indexes.currIndex;
    let currIndex = indexes.currIndex + 1;
    if (currIndex > numImages - 1) {
      if (wrap) {
        currIndex = 0;
      } else {
        currIndex = prevIndex;
      }
    }

    setIndex({ prevIndex, currIndex });
  }

  function previous() {
    let prevIndex = indexes.currIndex;
    let currIndex = indexes.currIndex - 1;
    if (currIndex < 0) {
      if (wrap) {
        currIndex = numImages - 1;
      } else {
        currIndex = 0;
      }
    }

    setIndex({ prevIndex, currIndex });
  }

  function set(index) {
    if (index < 0 || index > numImages - 1) {
      return;
    }

    setIndex({ prevIndex: indexes.currIndex, currIndex: index });
  }

  return { indexes, next, previous, set };
}

// Function to handle resizing the ImageGallery
var resizeTimeout = null;
//
function handleGalleryResize(imgRefs) {
  // When initially resized, hide all images except current image
  if (resizeTimeout === null) {
    for (let i = 0; i < imgRefs.length; i++) {
      let ref = imgRefs[i];
      if (ref === null) continue;
      if (ref.dataset.active === "false") {
        ref.style.display = "none";
      } else {
        ref.scrollIntoView();
      }
    }
  }

  // Don't do anything during resize. This is done by using timeouts
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    let activeIndex = 0;

    // After resize is done, show all images again and scroll to current image
    for (let i = 0; i < imgRefs.length; i++) {
      let ref = imgRefs[i];
      if (ref === null) continue;
      if (ref.dataset.active === "false") {
        ref.style.display = "block";
      } else {
        activeIndex = i;
      }
    }
    imgRefs[activeIndex].scrollIntoView({ behavior: "instant" });
    resizeTimeout = null;
  }, 50);
}

function ImageGallery({ images, isGalleryExpanded, onExpandGallery }) {
  // The refs to all the images in the gallery
  const imgRefs = [];
  // Ref to the gallery element
  const galleryRef = useRef(null);
  const numImages = images.length;
  const { indexes, next, previous, set } = useImageIndex(0, numImages, true);

  // Scroll to image when selected image index changes
  useEffect(() => {
    imgRefs[indexes.currIndex].scrollIntoView({ behavior: "smooth" });
    imgRefs[indexes.currIndex].dataset.active = true;
    if (indexes.prevIndex !== null)
      imgRefs[indexes.prevIndex].dataset.active = false;
  }, [indexes, imgRefs]);

  // Create observer and observe the ImageGallery component
  useEffect(() => {
    var galleryResizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        handleGalleryResize(imgRefs);
      }
    });
    galleryResizeObserver.observe(galleryRef.current);
    return () => galleryResizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={galleryRef}
      className={`${styles.imageGallery} ${
        isGalleryExpanded ? styles.expanded : ""
      }`}
    >
      <ExpandButton
        isGalleryExpanded={isGalleryExpanded}
        onExpandGallery={() => onExpandGallery((s) => !s)}
      />
      {numImages > 1 ? (
        <>
          <LeftButton onClick={previous} />
          <RightButton onClick={next} />
          <GalleryIndicator
            currentIndex={indexes.currIndex}
            numImages={numImages}
            setIndex={set}
          />
        </>
      ) : null}

      <div className={styles.carousel}>
        {images.map((img) =>
          img.endsWith(".mp4") ? (
            <video
              muted
              autoPlay
              data-active={false}
              loop
              key={img}
              ref={(ref) => imgRefs.push(ref)}
            >
              <source src={img} type="video/mp4"></source>
            </video>
          ) : (
            <img
              key={img}
              src={img}
              data-active={false}
              ref={(ref) => imgRefs.push(ref)}
            ></img>
          )
        )}
      </div>
    </div>
  );
}

function LeftButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${styles.galleryBtn} ${styles.galleryBtnLeft}`}
    >
      <i className="bi bi-caret-left-fill"></i>
    </div>
  );
}

function ExpandButton({ isGalleryExpanded, onExpandGallery }) {
  return (
    <div
      onClick={onExpandGallery}
      className={`${styles.galleryBtn} ${styles.galleryBtnExpand}`}
    >
      <i
        className={`bi bi-arrows-angle-${
          isGalleryExpanded ? "contract" : "expand"
        }`}
      ></i>
    </div>
  );
}

function RightButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${styles.galleryBtn} ${styles.galleryBtnRight}`}
    >
      <i className="bi bi-caret-right-fill"></i>
    </div>
  );
}

function GalleryIndicator({ numImages, currentIndex, setIndex }) {
  return (
    <div className={styles.galleryIndicator}>
      <div className={styles.wrapper}>
        {Array.from({ length: numImages }, (_, i) => 0 + i).map((num) => (
          <span
            className={styles.dot}
            style={{
              color: `${currentIndex === num ? "white" : "rgba(0,0,0,0.4)"}`,
            }}
            key={num}
            onClick={() => setIndex(num)}
          >
            &bull;
          </span>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
