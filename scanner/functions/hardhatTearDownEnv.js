function hardhatTearDownEnv() {
  resetHardhatContext();
  process.chdir(previousCWD); // remove?
}