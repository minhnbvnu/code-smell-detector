function handleSignals() {
  process.on('SIGTERM', () => {
    forwardSignalAndExit('SIGTERM');
  });
}