import styles from "./Track.module.css";

export default function Track({ album, albumArt, trackTitle, artist, render ,id, remove, addToPlaylist }) {
  return (
    <div className={styles.song}>
      <img
        className={styles.albumArt}
        src={albumArt}
        alt={`${album} cover`}
      />

      <div className={styles.titleAndArtist}>
        <p
          className={styles.title}
          aria-label="song title"
        >
          {trackTitle}
        </p>
        <p
          className={styles.artist}
          aria-label="song artist">
          {artist}
        </p>
      </div>

      <h5
        className={styles.album}
        aria-label="album title" >
        {album}
      </h5>

      { //determines whether to render [+] add or [-] remove button
        render === "results"
        ? <button
            id={id}
            className={styles.buttons}
            onClick={addToPlaylist}
          >
            +
          </button>
        : <button
            id={id}
            className={styles.buttons}
            onClick={remove} //removeFromPlaylist handler function from App.js
          >
            -
          </button>
      }
    </div>
  )
}