import { toHTML } from "@portabletext/to-html";
import getData from "./modules/getData";
import basicDomAppend from "./modules/dom/basicDomAppend";
import appendUL from "./modules/dom/appendUL";

const whichPageWeWorkingWith = document.querySelector(".subjectName").id;
if (whichPageWeWorkingWith == "Creative Writing") {
  whichPageWeWorkingWith = "English";
}
if (whichPageWeWorkingWith == "Literature") {
  whichPageWeWorkingWith = "English";
}
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

    if (i.name === "databases" && data.result.databasesForTopic?.length > 0) {
      const databaseData = data.result.databasesForTopic;
      // console.log("Database Data = ", databaseData)

      appendUL("databases");

      databaseData.forEach((i) => {
        // console.log(i.title, i.url, i.useProxy);
        let ourUrl = i.url;
        if (i.useProxy) {
          ourUrl = `${data.result.libraryProxyUrl[0].url}${i.url}`;
        }

        basicDomAppend(
          "databases-ul",
          `<li><a href="${ourUrl}" target="_blank">${i.title}</a></li>`
        );
      });
    }

    if (i.name === "websites" && cheatsheetData.websites?.length > 0) {
      appendUL("websites");
      cheatsheetData.websites.forEach((website) => {
        basicDomAppend(
          "websites-ul",
          `<li><a href="${website.url}" target="_blank">${website.title}</a></li>`
        );
      });
    }

    if (i.name === "ebooks" && cheatsheetData.ebooks?.length > 0) {
      console.log(cheatsheetData.ebooks[0]);
      appendUL("ebooks");

      cheatsheetData.ebooks.forEach((ebook) => {
        let ourUrl = ebook.url;
        if (ebook.useProxy) {
          ourUrl = `${data.result.libraryProxyUrl[0].url}${ebook.url}`;
        }
        basicDomAppend(
          "ebooks-ul",
          `<li><a href="${ourUrl}" target="_blank">${ebook.title}</a></li>`
        );
      });
    }

    if (
      i.name === "instructionVideos" &&
      cheatsheetData.instructionVideos?.length > 0
    ) {
      console.log(cheatsheetData.instructionVideos);
      cheatsheetData.instructionVideos.forEach((vid) => {
        appendUL("instructionVideos");
        basicDomAppend(
          "instructionVideos-ul",
          `<li><ul><li><a href="${vid.url}">${vid.title}</a></li>
            <li>${vid.description}</li>
            <li>${vid.length}</li>
            </ul></li>`
        );
      });
    }

    if (
      i.name === "citationStyles" &&
      cheatsheetData.citationStyles?.length > 0
    ) {
      console.log(cheatsheetData.citationStyles);

      // We may have multiple citation styles that we are building onto the page. So we loop over each possible one and do the same stuff for each one.

      cheatsheetData.citationStyles.forEach((citationStyle) => {
        let contentForDom = `<h3 style='font-family: "Roboto Condensed", sans-serif;text-decoration: underline;'>${citationStyle.title}</h3><div class="flex-container" style="margin: 0rem 0rem 4rem"><div class="flex-container"><img src="${citationStyle.catalogBook.coverImageURL}" alt="Book cover of ${citationStyle.title} Handbook"  ></img><p style="max-width:250px;align-self:center;margin-left:16px;margin-right:32px;">${citationStyle.catalogBook.description} It is available for use <a href="${citationStyle.catalogBook.permalink}" target="_blank">in the library.</a></p></div><div><h4 style='font-family: "Roboto Condensed", sans-serif;text-decoration: underline;'>Helpful Links</h4><ul id="${citationStyle.title}-helpful-links-ul"></ul></div></div>`;
        
        basicDomAppend("citationStyles", contentForDom);

        let citationStyleLinksForDom = `
          
          <li><a href="${styleLinks.purdueOwlLinks.primaryLink}" target="_blank">Guide @ the OWL</a></li>
          <li><a href="${styleLinks.purdueOwlLinks.citingBookSourcesLink}" target="_blank">Citing Book Sources</a></li>
          <li><a href="${styleLinks.purdueOwlLinks.citingOnlineSourcesLink}" target="_blank">Citing Online Sources</a></li>
          `
        
      });
    }
  }); //end our loop over default order

  if (cheatsheetData["customBlocks"]?.length > 0) {
    // After all of the default blocks are setup we look for Custom Blocks and insert as appropriate.
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
