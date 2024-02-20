function utils_shuffle(array) {
  const sorted = [...array];
  let m = sorted.length; // While there remain elements to shuffle…

  while (m) {
    // Pick a remaining element…
    const i = Math.floor(Math.random() * m--); // And swap it with the current element.

    const val = sorted[m];
    sorted[m] = sorted[i];
    sorted[i] = val;
  }

  return sorted;
}