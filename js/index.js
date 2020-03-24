document.addEventListener("DOMContentLoaded", () => pageSetup());

function pageSetup() {
  console.log("pageSetup has been reached");
  dragableSetup();
  newCardSetup();
}

function dragableSetup() {
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
      if (draggedItem != null) {
        e.target.append(draggedItem);
      }
    });
  }
}

function newCardSetup() {
  document.querySelector("#new-card").addEventListener("click", () => {
    let parentNode = document.querySelector(".board-container");
    let referenceNode = document.querySelector("#new-card");

    let newCard = document.createElement("div");
    newCard.className = "card";
    newCard.setAttribute("draggable", "true");
    let cardHeader = document.createElement("p");
    let cardAddItem = document.createElement("button");
    cardAddItem.addEventListener("click",(e) => makeItem(e))
    cardHeader.innerText = "New Card";
    cardAddItem.innerText = "Add Item";
    newCard.append(cardHeader, cardAddItem);

    parentNode.insertBefore(newCard, referenceNode);
    dragableSetup()
  });
}

function makeItem(event) {
    console.log(event)
    let newItem = document.createElement("div")
    newItem.className = "item"
    newItem.innerText = "New Item"
    newItem.setAttribute("draggable","true")
    debugger
    event.target.parentElement.appendChild(newItem)
    dragableSetup()
}