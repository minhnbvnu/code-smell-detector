function getSmallestAcceptableImage(images) {
  if ( !images || !images.size ) return DEFAULT_AVATAR;

  const minWidth = window.innerWidth / 3;
  let image = images.reverse().find( image => {
    return image.get('width') > minWidth
  });

  // If none of the images are big enough, pick the biggest one.
  if ( !image ) image = images.get(0);

  return image.get('url');
}