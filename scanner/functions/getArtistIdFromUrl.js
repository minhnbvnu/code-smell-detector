function getArtistIdFromUrl(url) {
  const artistIdRegex = /^\/artist\/(.+)/;
  const artistIdMatch = artistIdRegex.exec(url);

  if ( !artistIdMatch ) return null;

  const [ fullMatch, artistId ] = artistIdMatch;
  return artistId;
}