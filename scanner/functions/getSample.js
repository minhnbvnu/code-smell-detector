function getSample(fileLines, index) {
    let sample = fileLines[index];
    // Also removes the \r leftover from split('\n') on Windows
    // Using split('\n') in checkers however is OK, because file ending depends on Git settings and *may* be just '\n' even on Windows
    sample = sample.trim();

    return sample;
  }