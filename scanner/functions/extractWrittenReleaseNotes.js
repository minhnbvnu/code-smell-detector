function extractWrittenReleaseNotes(oldReleaseNotes) {
  if (oldReleaseNotes) {
    const extractMatch = oldReleaseNotes.match(
      /^## Notable Changes\r\n([\s\S]*)<details>/
    );
    if (extractMatch && extractMatch[1]) {
      return extractMatch[1].trim();
    }
  }

  return undefined;
}