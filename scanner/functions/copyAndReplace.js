function copyAndReplace(src, dest, replacements) {
  console.log('src', src);
  console.log('dest', dest);
  if (fs.lstatSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
  } else {
    let content = fs.readFileSync(src, 'utf8');
    Object.keys(replacements).forEach(regex =>
      content = content.replace(new RegExp(regex, 'g'), replacements[regex])
    );
    fs.writeFileSync(dest, content);
  }
}