import { useEffect, useState } from 'react';
import { accessToken } from './accessToken.js';
import searchRequest, { tracksArray } from './searchRequest.js';
import savePlaylist from './savePlaylist.js';
import LoginButton from './components/LoginButton/LoginButton';
import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';
import buttonStyles from "./components/Track/Track.module.css";

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [token, setToken] = useState(null);

  if (window.location.hash) {
    //positive lookbehind regex used ?<=
    //matches everything after "access_token=" but before the next "&"
    const accessToken = window.location.toString().match(/(?<=access_token=)([^&]*)/)[0];
    setToken(() => accessToken);
  };

  function handleSearchInput(e) {
    setOffset(() => 0);
    setSearch(() => e.target.value);
  };

  // updates search results for each input in the search bar
  useEffect(() => {
   searchRequest(search, accessToken, offset).then(() => setResults(tracksArray));
  }, [search, offset]);

  useEffect(() => async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me`, {
        "method": "GET",
        "headers": {
          "Authorization": `Bearer ${token}`,
          "content-type": "application/json"
        }
      });

      if (response.ok) {
        const jsonResponse = await response.json();

        setUser(() => jsonResponse.display_name);
        setUserPic(() => jsonResponse.images[0].url)
      }
      
    } catch (e) {
      console.log("Error with username GET request:");
      console.log(e);
    }
  });

  function nextPage () {
    setOffset(prev => prev + 10);
  };

  function previousPage () {
    if (offset >= 10) {
      setOffset(prev => prev - 10);
    }
  };

  function handleAddToPlaylist(e) {
    for (const song of tracksArray) {
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
    <div id="App">
      <header>
        <LoginButton
          user={user}
          userPic={userPic}
        />
        <h1 id="header-title">I wanna be <span id="jammming">Ja<span className="mmm">mmm</span>in'</span> with you</h1>
      </header>

      <div id="search">
        <SearchBar
          handleSearchInput={handleSearchInput}
          searchQuery={search}
        />
      </div>

      <div id="mainSection">
        <SearchResults
          addToPlaylist={handleAddToPlaylist}
          results={results}
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