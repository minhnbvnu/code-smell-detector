function checkForOutputFolder(folderPath, nickname) {
  var outputFolder = new Folder( folderPath );
  if (!outputFolder.exists) {
    var outputFolderCreated = outputFolder.create();
    if (outputFolderCreated) {
      message('The ' + nickname + ' folder did not exist, so the folder was created.');
    } else {
      warn('The ' + nickname + ' folder did not exist and could not be created.');
    }
  }
}