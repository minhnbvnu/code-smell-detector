function readJSONFile(pathname) {
  const options = {
    encoding: "utf8"
  };

  try {
    let data = fs.readFileSync(pathname, options);
    const obj = JSON.parse(data);
    return obj;
  } catch(err) {
    console.error(`Error loading JSON data for file ${pathname}: ${err}`);
  }

  return null;
}