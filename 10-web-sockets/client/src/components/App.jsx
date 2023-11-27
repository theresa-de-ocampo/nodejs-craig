import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

// * Components
import DocumentEditor from "./document-editor/DocumentEditor";
import LogIn from "./LogIn";

// * Utils
import { EVENTS } from "../utils";

export default function App() {
  const WS_URL = process.env.REACT_APP_WS_URL;
  const [username, setUsername] = useState();

  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true
  });

  useEffect(() => {
    if (username && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        username,
        type: EVENTS.USER
      });
    }
  }, [username, sendJsonMessage, readyState]);

  return (
    <>
      <h1>Real-Time Document Editor</h1>
      <main>
        {username ? <DocumentEditor /> : <LogIn onLogIn={setUsername} />}
      </main>
    </>
  );
}
