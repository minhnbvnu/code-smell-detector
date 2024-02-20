function getPreviousRegion(region) {
  if ( region === CATACOMBS ) return null;

  const sortedRegions = [CATACOMBS, GRAVEYARD, PAST, PRESENT, FUTURE];
  return sortedRegions[sortedRegions.indexOf(region) - 1];
}