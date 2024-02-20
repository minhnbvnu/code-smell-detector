async function execProcessor(codeDir, baseDir, processor) {
  debug('exec processor', processor);
  switch (processor.type) {
  case 'function': {
    const func = processor.function;
    await func(codeDir, baseDir);
    return;
  }
  case 'generateFile': {
    let p = resolvePath(processor.path);
    p = path.join(codeDir, p);

    await fs.ensureDir(path.dirname(p));

    const mode = processor.mode;
    const content = processor.content;

    await generateFile(p, processor.backup, mode, content);
    
    return;
  }
  default:
    throw new Error(`not supported processor ${JSON.stringify(processor)}`);
  }
}