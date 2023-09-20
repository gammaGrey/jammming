import { getAccessToken } from "../../accessToken";
import styles from "./LoginButton.module.css"

export default function LoginButton() {
  let username = sessionStorage.getItem("display name");
  let userPicture = sessionStorage.getItem("user picture");

  return (
    <button
      id={styles.login}
      onClick={username ? null : getAccessToken}
    >
      {username
        ? <>
          <span id={styles.loginButtonText}>
            {`Logged in as ${username}`}
          </span>
          <img
            id={styles.pic}
            src={userPicture}
            alt="Spotify user display picture"
          />
        </>
        : "Login"}
    </button>
  )
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