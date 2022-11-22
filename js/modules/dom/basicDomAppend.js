
export default (id, content) => {
    console.log("basicDomAppend", id, content);
  let domElement = document.getElementById(id);
  domElement.insertAdjacentHTML("beforeend", content);
  return;
};