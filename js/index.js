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
  newCard.addEventListener("click",(e)=>createCard(e))
  container.append(newCard);

  fetch(CARDS_URL)
    .then(resp => resp.json())
    .then(json => json.forEach(card => makeCard(card)))
    .then(() => setDragableEvents());
}

function makeCard(card) {
  let newCard = document.createElement("div");
  newCard.className = "temp-card";
  newCard.dataset.cardId = card.id;
  newCard.setAttribute("draggable", "true");

  let cardHeader = document.createElement("p");
  cardHeader.innerText = card.title;
  cardHeader.addEventListener("click", () => console.log("clicked card title"));

  let cardAddItem = document.createElement("button");
  cardAddItem.innerText = "Add Item";
  cardAddItem.addEventListener("click", e => createItem(e));

  newCard.append(cardHeader, cardAddItem);
  container.insertBefore(newCard, document.querySelector("#new-card"));
  if (card.items){
  card.items.forEach(item => makeItem(item));
  }
  newCard.className = "card";
}

function createItem(event) {
  // document.querySelector(`[data-card-id=${CSS.escape(card.id)}]`);
  let card_id = parseInt(event.target.parentElement.dataset.cardId);
  fetch(ITEMS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify({ card_id: card_id, title: "hello", content: "Hello" })
  })
    .then(resp => resp.json())
    .then(item => makeItem(item));
}

// function deleteItem(event) {
//   // document.querySelector(`[data-card-id=${CSS.escape(card.id)}]`);
//   let card_id = parseInt(event.target.parentElement.dataset.cardId);
//   fetch(ITEMS_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accepts: "application/json"
//     },
//     body: JSON.stringify({ card_id: card_id, title: "hello", content: "Hello" })
//   })
//     .then(resp => resp.json())
//     .then(item => makeItem(item));
// }

function createCard(event) {
  // document.querySelector(`[data-card-id=${CSS.escape(card.id)}]`);
  fetch(CARDS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify({title: "hello"})
  })
    .then(resp => resp.json())
    .then(card => makeCard(card));
}

function makeItem(item) {
  // document.querySelector(`[data-card-id=${CSS.escape(card.id)}]`);
  let card = document.querySelector(
    `[data-card-id=${CSS.escape(item.card_id)}]`
  ); //
  let newItem = document.createElement("div");
  newItem.setAttribute("draggable", "true");
  newItem.className = "item";
  newItem.innerText = item.title;
  card.appendChild(newItem);
  setDragableEvents();
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

  for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("dragover", e => {
      e.preventDefault();
    });

    card.addEventListener("dragenter", e => {
      e.preventDefault();
    });

    card.addEventListener("drop", e => {
      if (draggedItem != null && e.target.className == "card") {
        e.target.append(draggedItem);
      }
      if (draggedItem != null && e.target.className == "item") {
        let card = e.target.parentElement
        card.insertBefore(draggedItem,e.target)
      }
    });
  }
}
