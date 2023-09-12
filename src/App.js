import './App.css';
import { useEffect, useState } from 'react';

import LoginButton from './components/LoginButton/LoginButton';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import { resultsArray } from './searchRequest.js';

//refactor API request functions to have accessToken as a parameter 
import { accessToken } from './accessToken.js';
import savePlaylist from './savePlaylist.js';
import buttonStyles from "./components/Track/Track.module.css";

function App() {
  const [results, setResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("Jammming test playlist");
  const [search, setSearch] = useState("");

  function handleSearchInput(e) {
    console.log("\nvalue: " + e.target.value);
    console.log("search state: " + search);
    setSearch(() => e.target.value)
  };

  //changes results state, triggers useEffect to render SearchResults
  //(useEffect commented out until all features are implemented)
  function handleSearchSubmit() {
    setResults(() => resultsArray);
  };

  function handleAddToPlaylist(e) {
    for (const song of results) {
      if (!playlistTracks.includes(song) && song.id === e.target.id) {
        setPlaylistTracks(prev => [...prev, song]);

      } else if (playlistTracks.includes(song) && song.id === e.target.id) {
        // POP-UP  APPEARS FOR 0.8s SAYING THE SONG'S ALREADY IN THE PLAYLIST
        // Changes button className to one with an ::after pseudoelement for 800 ms
        e.target.className = buttonStyles.buttonsWithPopup;
        setTimeout(() => {
          e.target.className = buttonStyles.buttons;
        }, 415);
      }
    }
  };

  //removes the track with the same id attribute as the id of the target button
  function removeFromPlaylist(e) {
    setPlaylistTracks(prev => prev.filter(track => e.target.id !== track.id));
  };

  function handlePlaylistName(e) {
    setPlaylistName(() => e.target.value);
    console.log("playlist name: " + playlistName);
  };

  function handleSavePlaylist() {
    //save each track's uri to an array
    const URIArray = playlistTracks.map(track => track.uri);
    console.log("URIArray:")
    console.log(URIArray);
    savePlaylist(URIArray, playlistName);

    setTimeout(() => {
      
    }, 830);
  };

  function nextPage() {

  };

  function prevPage () {

  };

  // COMMENTED OUT WHILE I FINISH NECESSARY FUNCTIONALITY
  // useEffect(() => {
  //   if (search) {
  //     getAccessToken();
  //     //re-render <SearchResults/> when resultsArray changes
  //     searchRequest(search)
  //     .then(
  //       handleSearchSubmit()
  //     )
  //     .catch(() => {
  //         getAccessToken();
  //         console.log(new Error("with search effect hook"))
  //     });
  //   };
  // }, [search, results]);

  return (
    <div className="App">
      {/* <script defer>
        {getAccessToken()}
      </script> */}
      <header >
        <p>
          I wanna be ja<span className="mmm">mmm</span>in' with you
        </p>
      </header>
      <LoginButton />

      <div id="search">
        <SearchBar
          handleSearchInput={handleSearchInput}
          searchQuery={search}
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>

      <div id="mainSection">
        <SearchResults
          addToPlaylist={handleAddToPlaylist}
          results={results}
        />
        <Playlist
          playlistName={playlistName}
          editPlaylistName={handlePlaylistName}
          tracks={playlistTracks}
          removeFromPlaylist={removeFromPlaylist}
          savePlaylist={handleSavePlaylist}
        />
      </div>
    </div>
  );
}

export default App;