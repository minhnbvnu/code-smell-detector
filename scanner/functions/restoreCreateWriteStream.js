function restoreCreateWriteStream() {
  fs.createWriteStream = realCreateWriteStream;
}