//Want to put on the same line the elements
const bigElement = document.querySelectorAll(".main__element");
const item = document.querySelector(".main__element");
const smallCarousel = document.querySelector(".main__smallImages");
const mainCarousel = document.querySelector(".main__table");
const smallImage = document.querySelectorAll(".main__items");
const previous = document.getElementById("left");
const next = document.getElementById("right");
const first = document.querySelector(".main__element");
const searchTextTitle = document.querySelector(".main__searchText h3");
const searchTextDescription = document.querySelector(".main__searchText p");
const searchFoodImage = document.getElementById("imageFood");
const header = document.querySelector(".header");
const banner = document.querySelector(".banner");
function onScrollNav(domElement, height) {
  if (window.scrollY > height) {
    if (domElement === header) {
      domElement.style.position = "fixed";
      domElement.style.marginTop = "0";
    }

    if (domElement === banner || height > 800) {
      domElement.style.animation = "fade 2s ease-in forward";
    } else {
      domElement.style.animation = "none";
    }
  } else {
    domElement.style.position = "absolute";
    domElement.style.marginTop = "20px";
  }
}
window.addEventListener("scroll", () => {
  onScrollNav(header, 300);
  onScrollNav(banner, 900);
});

function converter(domElement) {
  //function to convert dom element into real arrays
  const elementArray = [];
  for (let element of domElement) {
    elementArray.push(element);
  }
  return elementArray;
}
console.log(converter(smallImage));
console.log(converter(bigElement));
for (elementArray in converter(bigElement)) {
  converter(bigElement)[elementArray].style.left = 90 * elementArray + "%";
}
// we create a function to help us change the table's color.

function tableTurn(target) {
  const degre = 90 * target;
  console.log(target);
  mainCarousel.style.transform = "rotate(-" + degre + "deg)";

  return degre;
}
function changeTableColor(numberOfDegree) {
  //here we are creating a changing color mechanism using the degrees of the turn of the doc.
  if (numberOfDegree == 90) {
    mainCarousel.style.borderColor = "#363a17a1";
  } else if (numberOfDegree == 180) {
    mainCarousel.style.borderColor = "#db933bb4";
  } else {
    mainCarousel.style.borderColor = "#b7620195";
  }
}

function animateFoodText(index) {
  const textSlide = document.querySelectorAll(".main__text");
  const currentTextSlide = document.querySelector(".toggle");
  currentTextSlide.classList.remove("toggle");
  converter(textSlide)[index].classList.add("toggle"); //remove the current toggle to the current element and add it to the list of element in the array [textSlide]
}
function changeNotice(currentStars, index) {
  const chiefWord = document.querySelectorAll(".main__infoBox");
  currentStars.classList.remove("current");
  converter(chiefWord)[index].classList.add("current");
  const star = document.querySelectorAll(".main__stars");
  converter(star)[index].style.transform = "translateX(" + 20 + "px)";
}

smallCarousel.addEventListener("click", (e) => {
  const currentStars = document.querySelector(".current");
  const currentSmallImage = document.querySelector(".mark");
  const targetElement = e.target.closest(".main__items");
  const index = converter(smallImage).findIndex(
    (element) => element == targetElement
  );
  currentSmallImage.classList.remove("mark");
  targetElement.classList.add("mark");

  tableTurn(index);
  animateFoodText(index);
  changeTableColor(tableTurn(index)); // nous appellons la function tableTurn dans changeTableColor car elle retourne le degree qui est notre parametre.
  changeNotice(currentStars, index);
});

next.addEventListener("click", () => {
  const currentSmallImage = document.querySelector(".mark");
  const currentStars = document.querySelector(".current");
  const singleElement = document.querySelector(".present");
  let nextSingleElement = singleElement.nextElementSibling;

  let index = 0; // here we are initializing the index to zero
  if (nextSingleElement == null) {
    // here we are creating a mechanism to help us when we click to the next buttton when we are at the end of our carousel to return to the begining of the line
    index = converter(bigElement).findIndex((element) => element == first);
    first.classList.add("present");
  } else {
    index = converter(bigElement).findIndex(
      (element) => element == nextSingleElement
    );
    singleElement.classList.remove("present");
    nextSingleElement.classList.add("present");
  }

  currentSmallImage.classList.remove("mark");
  smallCarousel.classList.add("mark");
  animateFoodText(index); //calling the function animateFoodText
  changeTableColor(tableTurn(index)); // calling the function changeTableColor
  changeNotice(currentStars, index); // calling the function changeNotice.
});
previous.addEventListener("click", () => {
  const currentStars = document.querySelector(".current");
  const singleElement = document.querySelector(".present");
  const previousSingleElement = singleElement.previousElementSibling;
  let index = 0;

  if (previousSingleElement == null) {
    // here we are creating a mechanism to help us when we click to the next buttton when we are at the end of our carousel to return to the begining of the line
    index = converter(bigElement).findIndex(
      (element) =>
        element === converter(bigElement)[converter(bigElement).length - 1]
    );

    //console.log(length-1);
    //console.log(converter(bigElement)[length-1]);
    //index=length-1;
  } else {
    index = converter(bigElement).findIndex(
      (element) => element == previousSingleElement
    );
    singleElement.classList.remove("present");
    previousSingleElement.classList.add("present");
  }
  animateFoodText(index);
  changeTableColor(tableTurn(index));
  changeNotice(currentStars, index);
  const chiefWord = document.querySelector(".current");
  console.log(chiefWord);
  chiefWord.style.animation = "fade ease-in 1s forwards 1s";
});

const search = document.querySelector(".main__search");
async function getMeal() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=Shawarma"
  );
  let result = await response.json();
  console.log(result);
  //console.log(result.meals[0].strInstructions);
}
getMeal();
search.addEventListener("keypress", async (event) => {
  const searchInput = document.getElementById("inputSearch").value.trim();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
  );
  console.log(searchInput);
  console.log(response);
  let result = await response.json();
  if (event.key === "Enter") {
    search.classList.add("change");
    document.querySelector(".main__searchResult").classList.add("show");
    searchTextTitle.innerHTML = result.meals[0].strMeal;
    searchTextDescription.innerHTML = result.meals[0].strInstructions;
    searchFoodImage.src = result.meals[0].strMealThumb;
  }
});
