import styles from "./SearchBar.module.css";
import songArray from "../../MockDatabase.js";

export default function SearchBar(props) {
  return (
    <>
    <h2>SearchBar</h2>
    <form onSubmit={null}>
      <label htmlFor={styles.searchBar}>Search </label>
      <input
        id={styles.searchBar}
        type="text"
        placeholder="Drop something groovy on me"
        aria-label="Search bar"
        value={props.searchQuery}
        onChange={props.handleChange}
        required
      />
    </form>
      <div
        id={styles.resultList}
      >
        {songArray.map((song) => (
          <div
            className={styles.songContainer} /*flex container */
            key={song.id}
          >
            <div
              className={styles.songResult}
            >
              <p>{song.name}</p>
              <p className={styles.artist}>{song.artist}</p>
            </div>
            <p className={styles.album}>{song.album}</p>
          </div>
        ))}
      </div>

    </>
  )
}