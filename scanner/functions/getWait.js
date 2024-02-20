function getWait (wait) {
  return (typeof wait === 'function') ? wait() : wait
}