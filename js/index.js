const BASE_URL = "http://localhost:3000";
const CARDS_URL = `${BASE_URL}/cards`;
const ITEMS_URL = `${BASE_URL}/items`;
const container = document.querySelector(".card-container");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  renderCards();
});

function renderCards() {
  console.log("Rendering page");
  container.innerHTML = "";
  let newCard = document.createElement("div");
  newCard.id = "new-card";
  container.append(newCard);

  fetch(CARDS_URL)
    .then(resp => resp.json())
    .then(json => json.forEach(card => makeCard(card)))
    .then(() => setDragableEvents());
}

function makeCard(card) {
  let referenceNode = document.querySelector("#new-card");
  let newCard = document.createElement("div");
  newCard.className = "temp-card";
  newCard.setAttribute("draggable", "true");

  let cardHeader = document.createElement("p");
  cardHeader.addEventListener("click", () => console.log("clicked card title"));
  cardHeader.innerText = card.title;
  let cardAddItem = document.createElement("button");
  cardAddItem.addEventListener("click", () =>
    console.log("clicked card title")
  );
  cardAddItem.innerText = "Add Item";

  newCard.append(cardHeader, cardAddItem);
  container.insertBefore(newCard, referenceNode);

  card.items.forEach(item => makeItem(item));
  newCard.className = "card";
}

function makeItem(item) {
  let card = document.querySelector(".temp-card");
  let newItem = document.createElement("div");
  newItem.setAttribute("draggable", "true");
  newItem.className = "item";
  newItem.innerText = item.title;
  card.appendChild(newItem);
}

function setDragableEvents() {
  let items = document.querySelectorAll(".item");
  let cards = document.querySelectorAll(".card");
  let draggedItem = null;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    item.addEventListener("dragstart", () => {
      console.log("dragstart");
      draggedItem = item;
      console.log(draggedItem);
      setTimeout(() => {
        item.style.display = "none";
      }, 0);
    });

    item.addEventListener("dragend", () => {
      console.log("dragend");
      setTimeout(() => {
        draggedItem.style.display = "block";
        draggedItem = null;
      }, 0);
    });
  }

  for (let j = 0; j < cards.length; j++) {
    card = cards[j];
    card.addEventListener("dragover", e => {
      e.preventDefault();
    });

    card.addEventListener("dragenter", e => {
      e.preventDefault();
    });

    card.addEventListener("drop", e => {
      let card = e.target;
      if (draggedItem != null && e.target.className == "card") {
        card.append(draggedItem);
      }
    });
  }
}
