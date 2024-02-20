function tile2lon(x, z) {
  return (x/Math.pow(2,z)*360-180);
}