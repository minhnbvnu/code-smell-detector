function truncateWidth(str, desiredLength){
  if (str.length === strlen(str)) {
    return str.substr(0, desiredLength);
  }

  while (strlen(str) > desiredLength){
    str = str.slice(0, -1);
  }

  return str;
}