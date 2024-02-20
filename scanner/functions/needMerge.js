function needMerge(file, context) {
  return context.merge
    && /template.(yml|yaml)$/.test(file)
    && fs.existsSync(path.resolve(context.outputDir, file));
}