function clearSessionCache(session) {
  return new Promise(resolve => {
    session.clearCache(resolve);
  });
}