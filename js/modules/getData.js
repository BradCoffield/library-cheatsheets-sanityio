export default async (area) => {
  console.log("getData for:", area);
  let PROJECT_ID = "wzuhalz9";
  let DATASET = "production";
  let QUERY = encodeURIComponent(
    `{"cheatsheetData": *[_type == "cheatsheet" && title match "${area}"]{  title, ebooks[]->{title, url, useProxy}, customBlocks[]->{content, location, title},  catalogQuickSearch->{quickSearchHTML, title, quickSearchJS},  instructionVideos[]->{description, length, title, url}, citationStyles[]->{title,catalogBook->{coverImageURL,permalink,description,title}, citingBookSourcesLink->{url, title, description}, citingGeneralGuideLink->{url, title, description}, citingOnlineSourcesLink->{url, title}}},"databasesForTopic": *[_type == "database" && "${area}" in databasesExcellentFor[]->.name]{title, url, useProxy, description, databasesExcellentFor[]->{name}},"websitesForCheatsheet": *[_type=="website" && "${area}" in websitesOnCheatsheets[]->.title],"libraryProxyUrl": *[_type == "proxyUrl"]{url}}`
  );
 

  // Compose the URL for your project's endpoint and add the query
  // let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
  /* this is to use the cdn for production time */
  let URL = `https://${PROJECT_ID}.apicdn.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

  const response = await fetch(URL);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
};
