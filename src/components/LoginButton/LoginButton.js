import { useState } from "react";
import getAccessToken from "../../accessToken";
import styles from "./LoginButton.module.css"

export default function LoginButton({ user, userPic }) {
  const [hover, setHover] = useState(false);

  function handleHover() {
      setHover(() => true)
  };

  function handleEndHover () {
    setHover(() => false);
  };

  return user
    ? <div className={styles.loggedInBanner} onMouseOver={handleHover} onMouseOut={handleEndHover}>
        { hover &&
        <>
          <img id={styles.pic} src={userPic} alt={`Spotify user ${user}`}/>
          <span id={styles.loggedInText}>Logged in as {user}</span>
        </> }
      </div>
    : 
      <button
        id={styles.loginButton}
        onClick={getAccessToken}
      >
        Login to Spotify
      </button>
}