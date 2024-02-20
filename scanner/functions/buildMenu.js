function buildMenu(pathname) {
  let output = "";
  const readdirOptions = {
    encoding: "utf8",
    withFileTypes: true
  };
  
  try {
    let files = fs.readdirSync(pathname, readdirOptions);
    let manifestList = loadAllManifests(files, pathname);

    output = buildMenuHTML(manifestList);
  } catch(err) {
    console.error("Error reading directory: " + err);
    return null;
  }

  output = `<dl>\n${output}</dl>\n`;
  return output;
}