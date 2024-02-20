function updateStdout(chunk) {
      stdout += chunk;
      if (onData) {
        onData(chunk);
      }
    }