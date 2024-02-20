function getLibById(libraryId) {

  let library, availableLibraries = AppController.sharedInstance().librariesController().availableLibraries()

  for (let i = 0; i < availableLibraries.length; i++) {
    if (String(libraryId) === String(availableLibraries[i].libraryID())) {
      library = availableLibraries[i]
      break;
    }
  }

  return library
}