import './App.css';
import { useEffect, useState } from 'react';
import searchRequest, { resultsArray } from './searchRequest.js';
import LoginButton from './components/LoginButton/LoginButton';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import savePlaylist from './savePlaylist.js';
import buttonStyles from "./components/Track/Track.module.css";

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [tracks, setTracks] = useState([]);

  if (window.location.hash) {
    //positive lookbehind regex used (?<=)
    //matches everything after "access_token=" but before the next "&"
    let token = window.location.toString().match(/(?<=access_token=)([^&]*)/)[0];
    sessionStorage.setItem("token", token);
  }
  let accessToken = sessionStorage.getItem("token");

  function handleSearchInput(e) {
    setOffset(() => 0);
    setSearch(() => e.target.value);
  };

  // 
  useEffect(() => {
   searchRequest(search, accessToken, offset).then(() => setTracks(resultsArray))
  }, [search, offset]);

  useEffect(() => {
    async function loggedIn () {
      try {
        const response = await fetch(`https://api.spotify.com/v1/me`,{
          "method": "GET",
          "headers": {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            "content-type": "application/json"
          }
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          
          console.log("jsonUsername:");
          console.log(jsonResponse);
          
          sessionStorage.setItem("display name", jsonResponse.display_name);
          sessionStorage.setItem("user picture", jsonResponse.images[0].url);
        }
      } catch (e) {
        console.log("Error with username GET request:");
        console.log(e);
      }
    }
    loggedIn();
    }, []);

  function nextPage () {
    setOffset(o => o + 10);
  };

  function previousPage () {
    if (offset >= 10) {
      setOffset(o => o - 10);
    }
  };

  function handleAddToPlaylist(e) {
    for (const song of resultsArray) {
      if (!playlistTracks.some(track => song.id === track.id) && song.id === e.target.id) {
        setPlaylistTracks(prev => [...prev, song]);
      } else if (playlistTracks.some(track => song.id === track.id) && song.id === e.target.id) {
        // Temporarily changes button className to one with an ::after pseudoelement 
        e.target.className = buttonStyles.buttonsWithPopup;
        setTimeout(() => {
          e.target.className = buttonStyles.buttons;
        }, 500);
      }
    }
  };

  //removes the track with the same id attribute as the id of the target button
  function removeFromPlaylist(e) {
    setPlaylistTracks(prev => prev.filter(track => e.target.id !== track.id));
  };

  function handlePlaylistName(e) {
    setPlaylistName(() => e.target.value);
  };

  function handleSavePlaylist() {
    //save each track's uri to an array variable
    const URIArray = playlistTracks.map(track => track.uri);
    savePlaylist(URIArray, playlistName);
  };

  function handleClearPlaylist () {
    setPlaylistTracks(() => []);
  }


  return (
    <div className="App">
      <header>
        <h2>
          I wanna be ja<span className="mmm">mmm</span>in' with you
        </h2>
      </header>
      <LoginButton />

      <div id="search">
        <SearchBar
          handleSearchInput={handleSearchInput}
          searchQuery={search}
        />
      </div>

      <div id="mainSection">
        <SearchResults
          addToPlaylist={handleAddToPlaylist}
          results={tracks}
          nextPage={nextPage}
          previousPage={previousPage}
        />
        <Playlist
          playlistName={playlistName}
          editPlaylistName={handlePlaylistName}
          tracks={playlistTracks}
          removeFromPlaylist={removeFromPlaylist}
          savePlaylist={handleSavePlaylist}
          clear={handleClearPlaylist}
        />
      </div>
    </div>
  );
}

export default App;