function handleSpawnError(error, full, binary) {

  if (fs.existsSync(full)) {
    throw new Error(
     "Your OS does not support " +
      binary.version + "-" + binary.suffix + ". " +
      "Modify your --arch flag."
    );
  } else {
    if (error.code === "ENOENT") {
      throw new Error(
       "Compiler not found for " +
        binary.version + "-" + binary.suffix + ". " +
       "Expected " + full
      );
    } else {
      throw error;
    }
  }

}