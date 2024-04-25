const headerElem = document.querySelector(".js-groups");

const markup = groupList
  .map((el) => {
    return `<li>${el}</li>`;
  })
  .join("");

headerElem.innerHTML = markup;
