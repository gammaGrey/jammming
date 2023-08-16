import styles from "./Track.module.css";

export default function Track(props) {
  return (
    <div
      className={styles.song}
    >
      <h2 className={styles.track}>
        Track
      </h2>
      <div className="title-and-artist">
        <h3 aria-label="song title" >{props.trackTitle}</h3>
        <h4 aria-label="song by" > {props.artist}</h4>
      </div>
      <h4 aria-label="album title" >{props.album}</h4>
      <h5>ID: {props.id}</h5>

      { //ternary operator determines whether to render +add or -remove button
        props.render === "results" ?
        <button
          className={styles.buttons}
          onClick={props.addToPlaylist}
          id={props.id}
        >+</button>
        :
        <button
        className={styles.buttons}
          onClick={props.remove} //removeFromPlaylist function from App.js
          id={props.id}
        >-</button>
      }
    </div>
  )
}