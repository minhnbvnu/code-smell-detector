function isDataSchema(url) {
  let i = 0;
  const ii = url.length;

  while (i < ii && url[i].trim() === "") {
    i++;
  }

  return url.substring(i, i + 5).toLowerCase() === "data:";
}