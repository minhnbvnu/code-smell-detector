function mapTempo(theoreticalTempo) {
    // these scenarios create infinite while loop
    if (!isFinite(theoreticalTempo) || theoreticalTempo == 0) {
      return;
    }
    // Adjust the tempo to fit within the 90-180 BPM range
    while (theoreticalTempo < 90)
      theoreticalTempo *= 2;
    while (theoreticalTempo > 180 && theoreticalTempo > 90)
      theoreticalTempo /= 2;
    return theoreticalTempo;
  }