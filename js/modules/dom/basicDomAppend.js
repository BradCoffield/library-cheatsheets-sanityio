export default (id, content) => {
    // console.log("basicDomAppend", id);
  let domElement = document.getElementById(id);
  domElement.insertAdjacentHTML("beforeend", content);
  return;
};