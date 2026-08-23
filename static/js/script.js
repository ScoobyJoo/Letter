document.addEventListener("DOMContentLoaded", () => {
  const scene = document.getElementById("scene");
  const envelope = document.getElementById("envelope");
  const letter = document.getElementById("letter");
  const closeBtn = document.getElementById("letterClose");

  function openLetter() {
    envelope.classList.add("is-open");
    scene.classList.add("is-open");
  }

  function closeLetter() {
    envelope.classList.remove("is-open");
    scene.classList.remove("is-open");
  }

  envelope.addEventListener("click", () => {
    if (!envelope.classList.contains("is-open")) {
      openLetter();
    }
  });

  closeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    closeLetter();
  });

  letter.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  initPhotoSlideshows();
});

function initPhotoSlideshows() {
  const SLIDE_INTERVAL_MS = 4500;
  const FRAME_STAGGER_MS = 900;

  function preload(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  document.querySelectorAll(".photo[data-photos]").forEach((frame, frameIndex) => {
    const sources = frame.dataset.photos
      .split(",")
      .map((src) => src.trim())
      .filter(Boolean);
    const layers = frame.querySelectorAll(".photo-layer");
    if (sources.length === 0 || layers.length < 2) return;

    let activeLayer = 0;
    let slideIndex = -1;

    async function showNextValidSlide() {
      for (let attempt = 0; attempt < sources.length; attempt++) {
        const nextIndex = (slideIndex + 1 + attempt) % sources.length;
        if (await preload(sources[nextIndex])) {
          const nextLayer = 1 - activeLayer;
          layers[nextLayer].style.backgroundImage = `url('${sources[nextIndex]}')`;
          layers[activeLayer].classList.remove("active");
          layers[nextLayer].classList.add("active");
          activeLayer = nextLayer;
          slideIndex = nextIndex;
          return true;
        }
      }
      return false;
    }

    setTimeout(async () => {
      if (await showNextValidSlide()) {
        setInterval(showNextValidSlide, SLIDE_INTERVAL_MS);
      }
    }, frameIndex * FRAME_STAGGER_MS);
  });
}
