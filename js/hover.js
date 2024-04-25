const headerElem = document.querySelector(".js-groups");

headerElem.addEventListener("mouseover", (e) => {
  if (e.target === e.currentTarget) return;
  const group = e.target.textContent.replaceAll(" ", "-");
  document.body.classList.forEach((value, key) => {
    document.body.classList.remove(value);
  });

  document.body.classList.add(`show-${group.toLowerCase()}`);
});

headerElem.addEventListener("mouseout", () => {
  document.body.classList.forEach((value, key) => {
    document.body.classList.remove(value);
  });
});
