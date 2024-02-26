const carouselContainer = document.querySelector(
  ".giveBack__title__image__theImages"
);

const left = document.querySelector(
  " .giveBack__title__image__leftSide__direction__1st"
);
const right = document.querySelector(
  " .giveBack__title__image__leftSide__direction__2nd"
);

const image = document.querySelector(".giveBack__title__image__theImages img");
const ranking = document.querySelector(".giveBack__title__image__leftSide h5");
let the_width = image.clientWidth;
let currentPosition = 0;
let track = 1;
left.addEventListener("click", () => {
  currentPosition += the_width;
  track -= 1;
  if (currentPosition > 0 || track < 1) {
    currentPosition = 0;
    track = 1;
    carouselContainer.style.transform = "translatex (" + currentPosition + ")";
  } else {
    carouselContainer.style.transform = "translatex(" + currentPosition + "px)";
    ranking.innerText = `${track}/3`;
  }
});
right.addEventListener("click", () => {
  track += 1;
  currentPosition -= the_width;
  if (currentPosition < -1260 || track > 3) {
    currentPosition = -1260;
    track = 3;
    carouselContainer.style.transform =
      "translatex (" + currentPosition + "px)";
  } else {
    carouselContainer.style.transform = "translatex(" + currentPosition + "px)";
    ranking.innerText = `${track}/3`;
  }
});
