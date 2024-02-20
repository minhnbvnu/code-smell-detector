function getEventTargetDocument(eventTarget) {
  return eventTarget.window === eventTarget
    ? eventTarget.document
    : eventTarget.nodeType === DOCUMENT_NODE
      ? eventTarget
      : eventTarget.ownerDocument;
}