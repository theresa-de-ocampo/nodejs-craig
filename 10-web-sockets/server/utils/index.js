const EVENTS = {
  USER: "user-event",
  DOCUMENT: "content-change"
};

function isUserEvent(message) {
  const event = JSON.parse(message.data);
  return event.type === EVENTS.USER;
}

function isDocumentEvent(message) {
  const event = JSON.parse(message.data);
  return event.type === EVENTS.DOCUMENT;
}

export { EVENTS, isUserEvent, isDocumentEvent };
