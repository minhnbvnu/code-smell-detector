function shouldIgnoreKey(key) {
  if (key[0] === "_") return true;
  if (key === "enter" || key === "exit" || key === "shouldSkip") return true;

  if (key === "denylist" || key === "noScope" || key === "skipKeys" || key === "blacklist") {
    return true;
  }

  return false;
}