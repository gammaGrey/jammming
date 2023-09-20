import styles from "./Track.module.css";

export default function Track(props) {
  return (
    <div className={styles.song}>
      <img
        className={styles.albumArt}
        src={props.albumArt}
        alt={`Album art for ${props.album}`}
      />

      <div className={styles.titleAndArtist}>
        <p
          className={styles.title}
          aria-label="song title"
        >
          {props.trackTitle}
        </p>
        <p
          className={styles.artist}
          aria-label="song artist">
          {props.artist}
        </p>
      </div>

      <h5
        className={styles.album}
        aria-label="album title" >
        {props.album}
      </h5>

      { //ternary operator determines whether to render +add or -remove button
        props.render === "results" ?
        <button
          className={styles.buttons}
          onClick={props.addToPlaylist}
          id={props.id}
        >
          +
        </button>
        :
        <button
          className={styles.buttons}
          onClick={props.remove} //removeFromPlaylist function from App.js
          id={props.id}
        >
          -
        </button>
      }
    </div>
  )
}