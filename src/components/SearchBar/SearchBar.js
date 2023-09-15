import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  return (
    <>
    <p>How it works atm:
      <br></br>
      type in a search query, submit, then change/delete query to show results
      {/* <br></br>
      Clunky, I know. That bug's being worked out */}
    </p>
    <form
      className={styles.searchForm}
      // sends the GET request to Spotify API
      onSubmit={(e) => {
        e.preventDefault();
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
        value="🔍"
        aria-label="Search button"
      />
    </form>
    </>
  )
}