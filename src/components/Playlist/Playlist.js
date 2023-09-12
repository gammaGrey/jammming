import styles from "./Playlist.module.css"
import Tracklist from "../Tracklist/Tracklist.js"

export default function Playlist(props) {

  return (
    <div
      className={styles.playlist}
    >
      <form>
        <label
          id={styles.playlistTitle}
          htmlFor={styles.playlistName}>
            Name your playlist
          </label>
        <br/>
        <input required type="text"
          id={styles.playlistName}
          onChange={props.editPlaylistName}
        />
      </form>
      <h3>{props.playlistName}</h3>
      <Tracklist
        tracks={props.tracks} // playlist state array
        remove={props.removeFromPlaylist}
      />
      <button
        className={styles.buttons}
        onClick={props.savePlaylist}>Save to Spotify</button>
      <button
        className={styles.buttons}
        onClick={props.clearPlaylist}>Clear</button>
    </div>
  )
}