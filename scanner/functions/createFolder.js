function createFolder(folder_name) {
  performLfmRequest('newfolder', {name: folder_name})
    .done(refreshFoldersAndItems);
}