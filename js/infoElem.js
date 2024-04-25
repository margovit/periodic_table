const containerElem = document.querySelector(".js-container");

containerElem.addEventListener("click", onElemClick);

function onElemClick(e) {
  const card = e.target.closest(".js-element");
  if (!card) return;
  const id = +card.dataset.id;
  const item = table[id];
  showModal(item);
}

function showModal(item) {
  const options = { className: "backdrop" };
  const instance = basicLightbox.create(modalTemplate(item), options);
  instance.show();
}

function modalTemplate(item) {
  const [symbol, title, value, , , desc] = item;
  return `
    <div class="modal">
    <h5>awdawd<h5>
    </div>
  `;
}

function test() {
  showModal(table[0]);
}

// test();
