import styles from "./SearchBar.module.css";
import searchRequest, { resultsArray } from "../../searchRequest";

export default function SearchBar(props) {
  return (
    <>
    <h2>SearchBar</h2>
    <p>How it works atm:
      <br></br>
      type in query, submit, then change/delete query to show results
      <br></br>
      Clunky, I know
    </p>
    <form
      className={styles.searchForm}
      // sends the GET request to Spotify API
      onSubmit={(e) => {
        e.preventDefault();
        searchRequest(props.searchQuery, null);
        props.handleSearchSubmit();
      }}
    >
      <label className={styles.searchLabel} htmlFor={styles.searchBar}>Search </label>
      <input
        type="text"
        onChange={props.handleSearchInput}
        
        id={styles.searchBar}
        placeholder="Drop something groovy on me"
        aria-label="Search bar"
      />
      <input
        className={styles.searchButton}
        type="submit"
        value="🔍🎵"
        aria-label="Search button"
      />
    </form>

    {/*
    The following JSX should render results before submission under the search bar, but requires the implementation of useEffect() in the onChange attribute in the text input field above

    <div id={styles.resultList}>
      {resultsArray.map((song) => (
          <div
            className={styles.songResult}
            key={song.id}
          >
            <p>{song.name}</p>
            <p className={styles.artist}>{song.artist}</p>
          <p className={styles.album}>{song.album}</p>
          </div>
      ))}
    </div> */}

    </>
  )
}