function addToRing(str) {
    killRing.push(str);
    if (killRing.length > 50) killRing.shift();
  }