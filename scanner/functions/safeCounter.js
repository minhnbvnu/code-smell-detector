function safeCounter () {
  c = c < discreteValues ? c : 0;
  c++; // this is not subliminal
  return c - 1;
}