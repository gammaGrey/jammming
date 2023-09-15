import './App.css';
import { useState } from 'react';
import LoginButton from './components/LoginButton/LoginButton';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import searchRequest, { resultsArray } from './searchRequest.js';
import savePlaylist from './savePlaylist.js';
import buttonStyles from "./components/Track/Track.module.css";

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("[Playlist name goes here]");
  const [search, setSearch] = useState("");

  let accessToken = localStorage.getItem("token");

  function handleSearchInput(e) {
    console.log("\nvalue: " + e.target.value);
    console.log("search state: " + search);
    setSearch(() => e.target.value)
  };

  function handleSearchSubmit() {
    setSearch(() => search);
    searchRequest(search, accessToken);
  };

  function handleAddToPlaylist(e) {
    for (const song of resultsArray) {
      if (!playlistTracks.some(track => song.id === track.id) && song.id === e.target.id) {
        setPlaylistTracks(prev => [...prev, song]);

      } else if (playlistTracks.some(track => song.id === track.id) && song.id === e.target.id) {
        // POP-UP  APPEARS FOR 0.8s SAYING THE SONG'S ALREADY IN THE PLAYLIST
        // Temporarily changes button className to one with an ::after pseudoelement
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
  };

  function handleSavePlaylist() {
    //save each track's uri to an array variable
    const URIArray = playlistTracks.map(track => track.uri);
    console.log("URIArray:")
    console.log(URIArray);
    savePlaylist(URIArray, playlistName);
  };

  function handleClearPlaylist () {
    setPlaylistTracks(prev => []);
  }

  //coming soon
  // function nextPage() {};
  // function prevPage () {};

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
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>

      <div id="mainSection">
        <SearchResults
          addToPlaylist={handleAddToPlaylist}
          results={resultsArray}
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