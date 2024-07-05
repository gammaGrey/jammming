import { getAccessToken } from "../../accessToken";
import styles from "./LoginButton.module.css"

export default function LoginButton({ user, userPic }) {
  return user
    ? <div id={styles.loggedInBanner} >
        <img
          id={styles.pic}
          src={userPic}
          alt={`Spotify user ${user}`}
        />

        <span id={styles.loggedInText}>
          {`Logged in as ${user}`}
        </span>
      </div>
    : 
      <button
        id={styles.loginButton}
        onClick={getAccessToken}
      >
        Login to Spotify
      </button>
}

// {!window.location.toString().match(/(?<=access_token=)([^&]*)/)  ?
//   <button
//     id={styles.login}
//     onClick={getAccessToken}
//   >
//       Login
//   </button>
//   :
//   <p id={styles.login}
//     onLoad={getAccessToken}
//   >
//     Logged in as user{/*props.user*/}
//   </p>
// }