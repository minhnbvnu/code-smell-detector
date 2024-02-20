async function getAndVerifyTpl() {
  const tplPath = await detectTplPath(false);

  if (!tplPath) {
    throw new Error(red('Current folder not a fun project\nThe folder must contains template.[yml|yaml] or faas.[yml|yaml] .'));
  }

  await validate(tplPath);

  return await getTpl(tplPath);
}