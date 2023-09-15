import Track from "../Track/Track";
import styles from "./SearchResults.module.css";

export default function SearchResults(props) {
  let key = 0;
  
  return(
    <div className={styles.searchResultsList}>
      <h2>Search Results</h2>
      
      {props.results.map(result => (
          <Track 
            className="array-result"
            key={key++}

            uri={result.uri}
            id={result.id}
            trackTitle={result.name}
            artist={result.artist}
            album={result.album}
            albumArt={result.albumArt}
            addToPlaylist={props.addToPlaylist}
            render="results"
          />
        ))}
        <div>
          <button>Prev</button>
          <button>Next</button>
          <p>Functionality coming soon</p>
        </div>
    </div>
  )
}