import styles from "./Playlist.module.css"
import Tracklist from "../Tracklist/Tracklist.js"

export default function Playlist({ tracks, editPlaylistName, removeFromPlaylist, savePlaylist, clear }) {

  return (
    <div className={styles.playlist}>

      <form
        onSubmit={ e => {e.preventDefault()} }
        className={styles.formFlex}
      >
        <input
          required
          type="text"
          aria-label="enter playlist name"
          placeholder="Playlist Name"
          id={styles.playlistName}
          onChange={editPlaylistName}
        />
      </form>

      <Tracklist
        tracks={tracks}
        remove={removeFromPlaylist}
      />

      <div id={styles.buttonsContainer}>
        <button
          className={styles.buttons}
          onClick={savePlaylist}
        >
          Save to Spotify
        </button>

        <button
          className={styles.buttons}
          onClick={clear}
        >
          Clear
        </button>
      </div>
    </div>
  )
}