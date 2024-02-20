function searchType() {
  var searchType = localStorage["search_type"];
  var oldFuzzySetting = "fuseT1";
  switch (localStorage["search_fuzzy"]) {
    case "true":
      oldFuzzySetting = "fuse";
      break;
    case "false":
      oldFuzzySetting = "regex";
      break;
  }
  return searchType ? searchType : oldFuzzySetting;
}