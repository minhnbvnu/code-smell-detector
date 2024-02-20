function componentsToMarkdown(type, json, filepath, idx, styles) {
  const componentName = getNameFromPath(filepath);
  const componentPlatform = getPlatformFromPath(filepath);
  const docFilePath = '../docs/' + componentName + '.md';

  if (fs.existsSync(docFilePath)) {
    json.fullDescription = fs.readFileSync(docFilePath).toString();
  }
  json.type = type;
  json.filepath = filepath.replace(/^\.\.\//, '');
  json.componentName = componentName;
  json.componentPlatform = componentPlatform;
  if (styles) {
    json.styles = styles;
  }
  json.example = getExample(componentName, componentPlatform);

  if (json.methods) {
    json.methods = json.methods.filter(filterMethods);
  }

  // Put Flexbox into the Polyfills category
  const category = (type === 'style' ? 'Polyfills' : type + 's');
  const next = getNextComponent(idx);

  const res = [
    '---',
    'id: ' + slugify(componentName),
    'title: ' + componentName,
    'layout: autodocs',
    'category: ' + category,
    'permalink: docs/' + slugify(componentName) + '.html',
    'platform: ' + componentPlatform,
    'next: ' + next,
    'sidebar: ' + shouldDisplayInSidebar(componentName),
    'runnable:' + isRunnable(componentName, componentPlatform),
    'path:' + json.filepath,
    '---',
    JSON.stringify(json, null, 2),
  ].filter(function(line) { return line; }).join('\n');
  return res;
}