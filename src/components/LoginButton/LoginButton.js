import { getAccessToken } from "../../accessToken";
import styles from "./LoginButton.module.css"

export default function LoginButton(props) {

  return (
    <>
    <button
      id={styles.login}
      onClick={getAccessToken}
    >
      Login
    </button>
    </>
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