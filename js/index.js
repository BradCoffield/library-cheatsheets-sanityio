import { toHTML } from "@portabletext/to-html";
import getData from "./modules/getData";
import basicDomAppend from "./modules/dom/basicDomAppend";

const whichPageWeWorkingWith = document.querySelector(".subjectName").id;
if (whichPageWeWorkingWith == "Creative Writing") {  whichPageWeWorkingWith = "English";}
if (whichPageWeWorkingWith == "Literature") {  whichPageWeWorkingWith = "English";}
console.log("Page = ", whichPageWeWorkingWith);

(async () => {
  const data = await getData(whichPageWeWorkingWith).catch((error) => {
    error.message;
  });
  console.log(data.result);
  let cheatsheetData = data.result.cheatsheetData[0];

  // Let's loop over our block order and get those wrappers into the dom
  const defaultBlockOrder = [
    { name: "catalogQuickSearch", place: 0 },
    { name: "databases", place: 1 },
    { name: "websites", place: 2 },
    { name: "ebooks", place: 3 },
    { name: "instructionVideos", place: 4 },
    { name: "citationStyles", place: 5 },
  ];

  //TODO: Have a spinner overlay the page until everything is done.

  //Build and append wrapper divs for all of our possible blocks
  defaultBlockOrder.forEach((i) => {
    const forAppending = `<div id="${i.name}">${i.name}</div>`;
    basicDomAppend("cheatsheets-content-wrapper", forAppending);

    if (i.name === "catalogQuickSearch") {
      // console.log(cheatsheetData[i.name]);
      basicDomAppend(i.name, cheatsheetData[i.name].quickSearchHTML);
      eval(cheatsheetData[i.name].quickSearchJS);
    }

    if (i.name === "databases") {
      const databaseData = data.result.databasesForTopic[0];
      console.log("Database Data = ", databaseData)
    }
  });

  // After all of the default blocks are setup we look for Custom Blocks and insert as appropriate.
  if (cheatsheetData["customBlocks"]?.length > 0) {
    cheatsheetData["customBlocks"].forEach((i) => {
      console.log(i);
      const place = document.querySelector(
        `#cheatsheets-content-wrapper :nth-child(${i.location})`
      );
      console.log(place.attributes.id.nodeValue);

      basicDomAppend(place.attributes.id.nodeValue, toHTML(i.content));
    });
  }
})();
