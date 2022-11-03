export default async () => {
  

    let PROJECT_ID = "wzuhalz9";
    let DATASET = "production";
    let QUERY = encodeURIComponent(
      '*[_type == "cheatsheet"]{  title, ebooks[]->{title, url, useProxy}, customBlocks[]->{content, location, title},  catalogQuickSearch->{quickSearchCode, title},  websites[]->{description, title, url},  instructionVideos[]->{description, length, title, url},  databases[]->{contentTypes,databasesExcellentFor[]->{name, topLevelArea}, databasesGoodFor[]->{name, topLevelArea}, featurable, title, url, useProxy },  citationStyles[]->{catalogBook->{coverImageURL,permalink,description,title}, citingBookSourcesLink->{url, title, description}, citingGeneralGuideLink->{url, title, description}, citingOnlineSourcesLink->{url, title}}}'
    );

    // Compose the URL for your project's endpoint and add the query
    let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    const response = await fetch(URL);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
    return await response.json();
    

}