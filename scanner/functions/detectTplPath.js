async function detectTplPath(preferBuildTpl = true, customTemplateLocations = [], showTip = true) {

  let buildTemplate = [];

  if (preferBuildTpl) {
    buildTemplate = ['template.yml', 'template.yaml'].map(f => {
      return path.join(process.cwd(), '.fun', 'build', 'artifacts', f);
    });
  }

  const defaultTemplate = ['template.yml', 'template.yaml', 'faas.yml', 'faas.yaml']
    .map((f) => path.join(process.cwd(), f));

  const tplPath = await asyncFind([...customTemplateLocations, ...buildTemplate, ...defaultTemplate], async (path) => {
    return await fs.pathExists(path);
  });

  if (tplPath && showTip && !hasShownTip) {
    console.log(yellow(`using template: ${path.relative(process.cwd(), tplPath)}`));
    hasShownTip = false;
  }

  return tplPath;
}