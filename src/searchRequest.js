import { accessToken } from "./accessToken.js";

let resultsArray = [];
function showResults(trackObjectArray) {
    resultsArray.length = 0;
    //add each track as an object to resultsArray
    for (const track of trackObjectArray.tracks.items) {
        
        resultsArray.push(
            {
                // Update to display FEATURED/COLLAB artists
                artist: track.artists[0].name,
                name: track.name,
                uri: track.uri,
                album: track.album.album_type === "single" ? "Single" : track.album.name,

                id: track.id,
                albumArt: track.album.images["1"].url
            }
        );
    }
}
//trying to pass search query from SearchBar.js to trackEndpoint variable

export default async function searchRequest(query) {
    let queryEndpoint = `https://api.spotify.com/v1/search?type=track&q=${query}&limit=10&offset=0`;

    try {
        const response = await fetch(queryEndpoint,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + accessToken,
                    "content-type": "application/json"
                },
            }
        );
        
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("jsonResponse:");
            console.log(jsonResponse);
            showResults(jsonResponse);

            console.log("\nresults array:");
            console.log(resultsArray);
        }
    } catch (e) {
        console.log(e);
    }
};

export { resultsArray };