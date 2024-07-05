import styles from "./SearchBar.module.css";

export default function SearchBar({ handleSearchInput }) {
  return (
    <form id={styles.searchForm}>
      <label htmlFor={styles.searchBar} id={styles.searchLabel}>Enter a song, artist or album to search</label>
      <input
        type="text"
        onChange={handleSearchInput}
        id={styles.searchBar}
        placeholder="search for a song"
        aria-label="Search bar"
      />
    </form>
  )
}