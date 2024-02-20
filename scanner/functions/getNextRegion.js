function getNextRegion(region) {
  if ( region === FUTURE ) return null;

  const sortedRegions = [CATACOMBS, GRAVEYARD, PAST, PRESENT, FUTURE];
  return sortedRegions[sortedRegions.indexOf(region) + 1];
}