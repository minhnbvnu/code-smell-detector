function shouldIgnoreKey(key) {
	  if (key[0] === "_") return true;

	  if (key === "enter" || key === "exit" || key === "shouldSkip") return true;

	  if (key === "blacklist" || key === "noScope" || key === "skipKeys") return true;

	  return false;
	}