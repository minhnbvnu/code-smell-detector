function getImageFileName(name, fmt) {
  // for file extension, convert png24 -> png; other format names are same as extension
  return name + '.' + fmt.substring(0, 3);
}