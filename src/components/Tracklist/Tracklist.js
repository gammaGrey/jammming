import Track from "../Track/Track";
import styles from "./Tracklist.module.css";

export default function Tracklist(props) {
  let key = 0;

  return (
    <div
      className={styles.tracklist}
    >
      <ul
        id={styles.list}
      >
        {props.tracks.map(track => (
          <li
            className={styles.track}
            key={key++}
          >
            <Track
              uri={track.uri}
              id={track.id}
              trackTitle={track.name}
              artist={track.artist}
              album={track.album}
              albumArt={track.albumArt}
              remove={props.remove}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}