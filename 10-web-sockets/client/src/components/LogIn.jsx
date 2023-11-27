import { useState } from "react";
import useWebSocket from "react-use-websocket";

export default function LogIn({ onLogIn }) {
  const WS_URL = process.env.REACT_APP_WS_URL;
  const [username, setUsername] = useState("");

  useWebSocket(WS_URL, {
    share: true,
    filter: () => false
  });

  function logInUser() {
    if (!username.trim()) {
      return;
    }

    onLogIn(username);
  }

  return (
    <section>
      <h2>Log In</h2>
      <form>
        <input name="username" onInput={(e) => setUsername(e.target.value)} />
        <button type="button" onClick={logInUser}>
          Join
        </button>
      </form>
    </section>
  );
}
