function writeCsvHeader(filename){
  let header = `issue, severity, confidence, filename, location, sample, description, url${os.EOL}`;

  fs.writeFile(filename, header, (err) => {
    if(err) throw err;
  });
}