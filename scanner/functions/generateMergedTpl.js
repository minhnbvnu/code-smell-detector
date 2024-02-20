async function generateMergedTpl(templates = [], preferBuildTpl = true, customTemplateLocations = [], showTip = true) {
  let tplPath;
  if (templates.length > 0) {
    tplPath = templates[0];
  }

  if (!tplPath) {
    tplPath = await detectTplPath(preferBuildTpl, customTemplateLocations, showTip);
    let overrideTplPath;
    if (tplPath) {
      templates.push(tplPath);
      overrideTplPath = await detectOverrideTplPath(tplPath);
    }
    if (overrideTplPath) {
      templates.push(overrideTplPath);
    }
  }

  if (!tplPath) {
    throw new Error(red('Current folder not a fun project\nThe folder must contains template.[yml|yaml] or faas.[yml|yaml] .'));
  }

  validateTplName(...templates);

  await validate(...templates);

  const tpl = await getTpl(...templates);
  return {
    tpl,
    tplPath
  };
}