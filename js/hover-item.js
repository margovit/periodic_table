const containerElem = document.querySelector(".js-container");
const hoverModalElem = document.querySelector(".js-hover-modal");
containerElem.addEventListener("mouseover", (e) => {
  const elem = e.target.closest(".js-element");
  if (!elem) return;
  const id = +elem.dataset.id;
  const item = table[id];
  const markup = templateModal(item);
  hoverModalElem.innerHTML = markup;

  const isLeftSide = e.pageX < window.screen.width / 2;
  const isTopSide = e.pageY < window.screen.height / 2;
  const left = isLeftSide ? e.pageX + 20 : e.pageX - 170;
  const top = isTopSide ? e.pageY + 20 : e.pageY - 170;

  hoverModalElem.style.top = `${top}px`;
  hoverModalElem.style.left = `${left}px`;
});

function templateModal(item) {
  const [symbol, name, weight, index, index2, desc, group] = item;

  return `
  <p>${symbol}</p>
  <p>${name}</p>
  <p>${weight}</p>
  <p>${group}</p>`;
}
