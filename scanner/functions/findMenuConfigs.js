function findMenuConfigs(filePath) {
  let dir = path.dirname(filePath);
  let parent = path.dirname(dir);

  while (dir !== parent) {
    const menuDir = path.join(dir, 'menus');
    if (fs.existsSync(menuDir)) {
      if (menuConfigCache[menuDir] != null) {
        return menuConfigCache[menuDir];
      }
      const configs = [];
      menuConfigCache[menuDir] = configs;
      fs.readdirSync(menuDir).forEach(configFile => {
        if (configFile.endsWith('.json')) {
          const configFilePath = path.join(menuDir, configFile);
          try {
            const contents = fs.readFileSync(configFilePath, 'utf-8');
            configs.push(JSON.parse(contents));
          } catch (e) {
            // ignore
          }
        }
      });
      return configs;
    }
    dir = parent;
    parent = path.dirname(dir);
  }

  return [];
}