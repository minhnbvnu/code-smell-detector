function deleteDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
    } catch (e) {
      // rmSync is not supported in node 12
      fs.rmdirSync(dirPath, { recursive: true });
    }
  } else {
    console.log('deleteDir: Directory path ' + dirPath + ' not found!');
  }
}