let resultsArray =[];

export function showResults(x) {
    resultsArray = [];

    //reset resultsArray to empty array
    // resultsArray.length = 0;
    //add each track as an object to resultsArray
    for (const track of x.tracks.items) {
        resultsArray.push(
            {
                // Update to display FEATURED/COLLAB artists
                artist: track.artists[0].name,
                name: track.name,
                uri: track.uri,
                album: track.album.album_type === "single" ? "Single" : track.album.name,
                albumArt: track.album.images["1"].url,
                id: track.id
            });
    }
}

export default async function searchRequest(query, accessToken) {
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
            console.log("search response: ")
            console.log(jsonResponse);
            //function call to update resultsArray
            //should probably be put in App.js, not here
            showResults(jsonResponse);
        }
    } catch (e) {
        console.log(e);
    }
};

export { resultsArray };