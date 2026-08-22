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
});
