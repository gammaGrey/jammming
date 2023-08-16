import styles from "./Playlist.module.css"
import Tracklist from "../Tracklist/Tracklist.js"

export default function Playlist(props) {
  console.log(props.playlistTracks);

  return (
    <div
      className={styles.Playlist}
    >
      <h2>Playlist</h2>
      <form>
        <label className={styles.label} htmlFor={styles.playlistName}>Playlist name:</label>
        <br/>
        <input type="text" id={styles.playlistName} required />
        <button></button>
      </form>
      <br></br>

      <Tracklist
        tracks={props.tracks} // playlist state array
        remove={props.removeFromPlaylist}
      />
    </div>
  )
}