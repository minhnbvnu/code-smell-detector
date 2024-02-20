function removeTmpFiles() {
  try {
    fs.unlinkSync(tmpFilePath())
  } catch (err) {
    // console.log(err);
  }
}