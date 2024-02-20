function buildFPFn({ title, generatedFrom, args: { length } }) {
  const fpFnLines = getFPFn(title, generatedFrom, length)
  const fpFnDir = `${FP_DIR}/${title}`

  if (!fs.existsSync(fpFnDir)) {
    fs.mkdirSync(fpFnDir)
  }
  fs.writeFileSync(`${fpFnDir}/index.js`, prettier(fpFnLines))
}