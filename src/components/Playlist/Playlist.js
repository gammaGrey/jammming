import styles from "./Playlist.module.css"
import Tracklist from "../Tracklist/Tracklist.js"

export default function Playlist(props) {

  return (
    <div className={styles.playlist}>
      <form
        onSubmit={(e) => {e.preventDefault()}}
        className={styles.formFlex}
      >
        <input
          required
          type="text"
          aria-label="Playlist name input field"
          placeholder="Playlist Name"
          id={styles.playlistName}
          onChange={props.editPlaylistName}
        />
      </form>
      <Tracklist
        tracks={props.tracks}
        remove={props.removeFromPlaylist}
      />
      <button
        className={styles.buttons}
        onClick={props.savePlaylist}>Save to Spotify</button>
      <button
        className={styles.buttons}
        onClick={props.clear}>Clear</button>
    </div>
  )
}