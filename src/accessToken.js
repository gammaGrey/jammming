const clientID = "18c21a64c86048f5940feb3b905c8538";
const redirectURI = `https://gammagrey.github.io/jammming/`;

let accessToken;
let expiresIn;

//get access token by implicit grant
export function getAccessToken() {
    if (accessToken) {
        console.log("ACCESS TOKEN: " + accessToken);
        return accessToken;
    }
    //regex for access_token hash fragment: access_token=([^&]*)
    
    if (window.location.hash) {
        //positive lookbehind regex used (?<=)
        //matches everything after "access_token=" but before the next "&"
        accessToken = window.location.toString().match(/(?<=access_token=)([^&]*)/)[0];
        localStorage.setItem("token", accessToken);
        
        console.log(`hash fragment: ${window.location.hash}`);
        console.log(`access token: ${accessToken}`);
        return accessToken;
    } else {   
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&show_dialog=true&scope=playlist-modify-private playlist-modify-public user-read-private&redirect_uri=${redirectURI}`;
    };
    
    if (window.location.toString().match(/expires_in=([^&]*)/)) {
        expiresIn = window.location.toString().match(/(?<=expires_in=)([^&]*)/)[0];
        console.log(`expires in: ${expiresIn}`);
        
        setTimeout(() => {
            window.location = redirectURI;
        }, expiresIn * 1000);
    } 
};

export { accessToken };
