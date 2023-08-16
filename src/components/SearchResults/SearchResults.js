import Track from "../Track/Track";
import styles from "./SearchResults.module.css";

export default function SearchResults(props) {
  let key = 0;

  return(
    <div className={styles.searchResultsList}>
      <h2>SearchResults</h2>
      {/* mock search results mapped to a list from results state hook */}
      {props.results.map(result => (
          <Track 
            className="array-result"
            key={key++}
            id={result.id}
            trackTitle={result.title}
            artist={result.artist}
            album={result.album}
            addToPlaylist={props.addToPlaylist}
            render="results"
          />
      ))}
    </div>
  )
}