import Track from "../Track/Track";
import styles from "./Tracklist.module.css";

export default function Tracklist(props) {
  let key = 0;
  console.log("Tracklist tracks: ");
  console.log(props.tracks);

  //begin JSX
  return (
    <div
      className={styles.tracklist}
    >
      <h2>Tracklist</h2>
      <p>tracks rendered with playlistTracks (array) state hook in App.js</p>
      <ul>
        {props.tracks.map(track => (
          <li
            className={styles.track}
            key={key++}
          >
            <Track
              id={`${track.id}`}
              trackTitle={`title: ${track.title}`}
              artist={`artist: ${track.artist}`}
              album={`album: ${track.album}`}
              remove={props.remove}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}