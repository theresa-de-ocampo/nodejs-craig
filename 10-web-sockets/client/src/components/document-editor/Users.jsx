import React from "react";
import useWebSocket from "react-use-websocket";
import Avatar from "react-avatar";

// * Utils
import { isUserEvent } from "../../utils";

export default function Users() {
  const WS_URL = process.env.REACT_APP_WS_URL;

  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent
  });

  const users = Object.values(lastJsonMessage?.data.users || {});

  return users.map((user) => (
    <div key={user.username}>
      <Avatar name={user.username} size={40} round="20px" />
    </div>
  ));
}
