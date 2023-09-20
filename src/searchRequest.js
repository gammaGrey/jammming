let resultsArray = [];

function showResults(x) {
    //reset resultsArray to empty array
    resultsArray = [];

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
    return resultsArray;
}

export default async function searchRequest(query, accessToken, offset = 0) {
    if (!query) {
        return;
    }
    let endpoint = `https://api.spotify.com/v1/search?type=track&q=${query}&limit=10&offset=${offset}`;

    try {
        const response = await fetch(endpoint,
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

            //function call to update resultsArray
            resultsArray = showResults(jsonResponse);
            return resultsArray;
        }
    } catch (e) {
        console.log(e);
    }
};

export { resultsArray };