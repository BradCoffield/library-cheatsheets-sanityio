export default (id, content) => {
  console.log("appendUl", id);
  let domElement = document.getElementById(id);
  domElement.insertAdjacentHTML("beforeend", `<ul id="${id}-ul"></ul>`);
  return;
};
