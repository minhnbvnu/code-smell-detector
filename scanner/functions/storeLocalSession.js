function storeLocalSession(storage, key, sid) {
  // Attempt to store session id to local storage
  const cachedSession = storage.getItem(key);
  let session;
  if (cachedSession) {
    // Found exisiting session in storage
    const parsedSession = JSON.parse(cachedSession);
    session = {
      ...parsedSession,
      session_id: sid
    };
  } else {
    // No existing local session, create a new empty session with only session_id
    session = {
      session_id: sid
    };
  }
  // Store updated session to storage
  storage.setItem(key, JSON.stringify(session));
}