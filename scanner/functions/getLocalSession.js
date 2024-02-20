function getLocalSession(storage, key) {
  // Attempt to get local session from storage
  const cachedSession = storage.getItem(key);
  let session = null;
  if (cachedSession) {
    // Found existing session in storage
    const parsedSession = JSON.parse(cachedSession);
    // Format conversation from array of object to immutable Map for use by messages components
    const formattedConversation = parsedSession.conversation
      ? parsedSession.conversation
      : [];
    // Check if params is undefined
    const formattedParams = parsedSession.params
      ? parsedSession.params
      : {};
    const formattedMetadata = parsedSession.metadata
      ? parsedSession.metadata
      : {};
    // Create a new session to return
    session = {
      ...parsedSession,
      conversation: formattedConversation,
      params: formattedParams,
      metadata: formattedMetadata
    };
  }
  // Returns a formatted session object if any found, otherwise return undefined
  return session;
}