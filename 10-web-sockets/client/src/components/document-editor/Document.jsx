import useWebSocket from "react-use-websocket";
import { DefaultEditor } from "react-simple-wysiwyg";

// * Utils
import { EVENTS, isDocumentEvent } from "../../utils";

export default function Document() {
  const WS_URL = process.env.REACT_APP_WS_URL;

  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isDocumentEvent
  });

  let html = lastJsonMessage?.data.editorContent || "";

  function handleHtmlChange(e) {
    sendJsonMessage({
      type: EVENTS.DOCUMENT,
      content: e.target.value
    });
  }

  return <DefaultEditor value={html} onChange={handleHtmlChange} />;
}
