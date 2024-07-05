import Track from "../Track/Track";
import styles from "./SearchResults.module.css";

export default function SearchResults({ results, addToPlaylist, previousPage, nextPage }) {

  return(
    <div className={styles.searchResultsList}>
      <h2 id={styles.searchResultsSubtitle}>Search Results</h2>
      
      { results.map((result, i) => (
        <Track 
          className="array-result"
          key={i}

          uri={result.uri}
          id={result.id}
          trackTitle={result.name}
          artist={result.artist}
          album={result.album}
          albumArt={result.albumArt}
          addToPlaylist={addToPlaylist}
          render="results"
        />
      ))}
        <div id={styles.pageButtonContainer}>
          <button
            className={styles.buttons}
            onClick={previousPage}
          >
            Prev
          </button>
          <button
            className={styles.buttons}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
    </div>
  )
}