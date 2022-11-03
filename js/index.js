import { toHTML } from "@portabletext/to-html";
// const getData = require("./modules/getData").default
import getData from "./modules/getData";

(async () => {
  const data = await getData().catch((error) => {
    error.message;
  });
  console.log(data.result[0]);
  let cheatsheetData = data.result[0];

  const defaultBlockOrder = [
    { name: "catalogQuickSearch", place: 0 },
    { name: "databases", place: 1 },
    // { name: "websites", place: 2 },
    // { name: "ebooks", place: 3 },
    // { name: "instructionVideos", place: 4 },
    // { name: "citationStyles", place: 5 },
  ];

  defaultBlockOrder.forEach((i) => {
    console.log(i.name, cheatsheetData[i.name]);
  });
})();

// some starter dom stuff
// const selectDomIdAndAppend = (id, content) => {
//   let domElement = document.getElementById(id);
//   domElement.insertAdjacentHTML("beforeend", content);
// };

// selectDomIdAndAppend(
//   "catalog-quick-search",
//   result[0].catalogQuickSearch.quickSearchCode
// );
// result[0].databases.forEach((item) => {
//   selectDomIdAndAppend("databases", item.title);
// });
// console.log("hi", toHTML(result[0].customBlocks[0].content));
// selectDomIdAndAppend(
//   "customBlock1",
//   toHTML(result[0].customBlocks[0].content)
// );
