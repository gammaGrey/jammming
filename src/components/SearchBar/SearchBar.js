import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  return (
    <>
    <p>
      Enter a song, artist or album to search
    </p>
    <form className={styles.searchForm}>
      <input
        type="text"
        onChange={props.handleSearchInput}
        id={styles.searchBar}
        placeholder="🔍 Drop something groovy on me"
        aria-label="Search bar"
      />
    </form>
    </>
  )
}