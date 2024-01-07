function createBidiText(str, isLTR, vertical = false) {
  let dir = "ltr";

  if (vertical) {
    dir = "ttb";
  } else if (!isLTR) {
    dir = "rtl";
  }

  return {
    str,
    dir
  };
}