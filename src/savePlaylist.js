import { accessToken } from "./accessToken";

export default async function savePlaylist(URIArray, playlistName) {
    let userID;
    let playlistID;

    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${accessToken}`,
                "content-type": "application/json"
        }
        })

        if (response.ok) {
            const jsonResponse = await response.json();

            console.log("jsonResponse from savePlaylist:")
            console.log(jsonResponse);

            userID = jsonResponse.id;
            console.log("USER ID: " + userID);
        };
    } catch (e) {
        console.log(e);
    };
    
    const newPlaylistEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
    try {
        // SAVE PLAYLIST NAME TO STATE HOOK
        // "description": playlistDescription, added to data
        const response = await fetch(newPlaylistEndpoint, {
            "method": "POST",
            "headers": {
                "Authorization": `Bearer ${accessToken}`,
                "content-type": "application/json"
            },
            "body": JSON.stringify(
                {
                    "name": playlistName
                }
            )
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            playlistID = jsonResponse.id;
        };

    } catch (e) {
        console.log(e);
    };

    const savePlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    try {
        const response = await fetch(savePlaylistEndpoint,{
            "method": "POST",
            "headers": {
                "Authorization": `Bearer ${accessToken}`,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                "uris": URIArray
            })
        });

        if (response.ok) {
            console.log(await response.json());
        }

    } catch (e) {
        console.log(e);
    }
}