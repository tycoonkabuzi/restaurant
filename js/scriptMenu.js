import food from "../js/data/database.js";
const menu = document.querySelector(".theMenu__container");
const menuLink = document.getElementById("links");

function createMenuItem(item) {
  const theMenu__container__item = document.createElement("div");
  theMenu__container__item.classList.add("theMenu__container__item");
  const pictureFood = document.createElement("img");
  pictureFood.src = item.meal;
  const theMenu__container__item__grams = document.createElement("div");
  theMenu__container__item__grams.classList.add(
    "theMenu__container__item__grams"
  );
  theMenu__container__item__grams.innerText = item.weight + "g";
  const theMenu__container__item__title = document.createElement("h3");
  theMenu__container__item__title.classList.add(
    "theMenu__container__item__title"
  );

  theMenu__container__item__title.innerHTML = item.name;
  const theMenu__container__item__description = document.createElement("div");
  theMenu__container__item__description.classList.add(
    "theMenu__container__item__description"
  );
  theMenu__container__item__description.innerText = item.description;
  const theMenu__container__item__price = document.createElement("div");
  theMenu__container__item__price.classList.add(
    "theMenu__container__item__price"
  );
  const price = document.createElement("h1");
  price.innerText = "$" + item.price;
  const button = document.createElement("button");
  const img = document.createElement("img");
  button.appendChild(img);
  img.src = "/images/buy.png";
  menu.appendChild(theMenu__container__item);
  theMenu__container__item.appendChild(pictureFood);
  theMenu__container__item.appendChild(theMenu__container__item__grams);
  theMenu__container__item.appendChild(theMenu__container__item__title);
  theMenu__container__item.appendChild(theMenu__container__item__description);

  theMenu__container__item.appendChild(theMenu__container__item__price);
  theMenu__container__item__price.appendChild(button);
  theMenu__container__item__price.appendChild(price);
  return theMenu__container__item;
}
function showElement() {
  food.forEach(function (item) {
    const menuItem = createMenuItem(item);
    menu.appendChild(menuItem);
  });
}
showElement();
menuLink.addEventListener("click", (e) => {
  menu.innerHTML = "";
  console.log(e.target.textContent);
  const selected = e.target.textContent;
  if (selected == "All") {
    showElement();
  }
  const filtered = food.filter(function (element) {
    if (element.whichOne === selected) {
      return element.whichOne === selected;
    }
  });
  filtered.forEach(function (item) {
    const menuItem = createMenuItem(item);
    menu.appendChild(menuItem);
  });
});
