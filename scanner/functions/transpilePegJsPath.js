function transpilePegJsPath(pegJsPath) {
  const inputCode = fs.readFileSync(pegJsPath, 'utf8');
  const jsPath = pegJsPath.replace(/pegjs$/g, 'js');
  const outputCode =
    'module.exports = ' + peg.buildParser(inputCode, { output: 'source' });
  fs.writeFileSync(jsPath, outputCode);
  fs.unlinkSync(pegJsPath);
}