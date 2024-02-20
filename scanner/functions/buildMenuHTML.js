function buildMenuHTML(manifestList) {
  let output = "";

  manifestList.forEach(entry => {
    output += buildMenuEntry(entry);
  });
  return output;
}