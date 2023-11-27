import React from "react";
import useWebSocket from "react-use-websocket";

// * History
import { isUserEvent } from "../../utils";

export default function History() {
  const WS_URL = process.env.REACT_APP_WS_URL;

  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent
  });

  const activities = lastJsonMessage?.data.userActivity || [];

  return (
    <ul>
      {activities.map((activity, i) => (
        <li key={`activity-${i}`}>{activity}</li>
      ))}
    </ul>
  );
}
