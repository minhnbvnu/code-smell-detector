function usage(message) {
  if (message) {
    console.log("Error: " + message);
  }
  console.log("Usage: ICALTester rules.json /path/to/binary");
  process.exit(1);
}