function copyFolderContents(fromFolder, toFolder){
  // Sync:
  try {
    fs.copySync(fromFolder, toFolder, {overwrite: true})
    // console.log('success!')
  } catch (err) {
    console.error(err)
  }

}