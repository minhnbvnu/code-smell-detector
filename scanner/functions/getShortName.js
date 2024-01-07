function getShortName(longname) {
  if (!longname.includes('module:ol/')) {
    return longname;
  }
  if (longname.includes('|')) {
    return longname;
  }
  if (longname.includes('<')) {
    return longname;
  }
  return longname.split(/[\~\.#\:]/).pop();
}