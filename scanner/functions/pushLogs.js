function pushLogs(message) {
  if (!_store) return;
  _store.logs += '\n' + message.replace(/\s+$/, '');
  const len = _store.logs.length;
  if (len > MAX_LOG_LENGTH) {
    _store.logs = _store.logs.substring(len - MAX_LOG_LENGTH, len);
  }
}