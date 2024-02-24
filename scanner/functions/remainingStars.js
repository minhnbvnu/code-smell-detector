function remainingStars(data, stars) {
  try {
    const remainingStars = filterForUniqueStars(data, stars);
    return [...remainingStars.slice(0, 3)] || [];
  } catch {
    console.log("You have no stars stored in your open-sauced-goals repo. Check to see if the Open Sauced integration is up to date.");
    return [];
  }
}