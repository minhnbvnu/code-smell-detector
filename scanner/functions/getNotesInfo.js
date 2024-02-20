function getNotesInfo(directory, directoryMap, currentNoteID) {
    let totalNotes = directory.notes.length;
    let hasMoreThanFiveNotes = directory.notes.length > 5;
    let dirContainsCurrentNote = directory.notes.some(note => note.id == currentNoteID);

    for (let i = 0; i < directory.subdirectories.length; i++) {
        let subdirectoryId = directory.subdirectories[i].id;
        let subdirectory = directoryMap.get(subdirectoryId);
        if (subdirectory) {
            let subdirectoryInfo = getNotesInfo(subdirectory, directoryMap, currentNoteID);
            totalNotes += subdirectoryInfo.totalNotes;
            hasMoreThanFiveNotes = hasMoreThanFiveNotes || subdirectoryInfo.hasMoreThanFiveNotes;
            dirContainsCurrentNote = dirContainsCurrentNote || subdirectoryInfo.dirContainsCurrentNote;
        }
    }

    return { totalNotes, hasMoreThanFiveNotes, dirContainsCurrentNote };
}