import './App.css';
import { useState } from 'react';
import Playlist from './components/Playlist/Playlist';
import SearchResults from './components/SearchResults/SearchResults';
import SearchBar from './components/SearchBar/SearchBar';
import songArray from './MockDatabase';

function App() {
  const [results, setResults] = useState(songArray);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // function changeHandler(e) {
  //   setSearch(() => e.target.value)
  // };

  function handleAddToPlaylist(e) {
    for (const song of results) {
      if (song.id === e.target.id) {
        setPlaylistTracks(prev => [...prev, song]);
      }
    }
  };

  function removeFromPlaylist(e) {
    //removes the track with the same id attribute as the id of the target button

    setPlaylistTracks(prev => prev.filter((track) => e.target.id !== track.id));
  };

  return (
    <div className="App">
      <header >
        <p>
          I wanna be ja
          <span className="bold italic">
            mmm
          </span>
          in' with you
        </p>
      </header>

      <div id="search">
        <h3>right now don't worry about search bar</h3>
        <SearchBar
          searchQuery={`change this prop back`}
          // handleChange={changeHandler}
        />
      </div>

      <div id="mainSection">
        <SearchResults
          addToPlaylist={handleAddToPlaylist}
          results={results}
        />
        <Playlist
          tracks={playlistTracks}
          removeFromPlaylist={removeFromPlaylist}
        />
      </div>
    </div>
  );
}

export default App;