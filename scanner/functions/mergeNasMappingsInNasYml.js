async function mergeNasMappingsInNasYml(nasYmlPath, serviceNasMappings) {
  // read from .nas.yml
  const nasMappingsInNasYml = await getNasMappingsFromNasYml(nasYmlPath);

  const customizer = (objValue, srcValue) => {
    if (objValue) {
      const isEqualCustomizer = (objValue, othValue) => {
        // 这里判断 nasMappings 里的 localNasDir 要严格相等：绝对路径相同（存在相对路径的情况)
        const strictEqual = (path.resolve(objValue.localNasDir) === path.resolve(othValue.localNasDir)) && (objValue.remoteNasDir === othValue.remoteNasDir);
        return strictEqual;
      };
      return _.uniqWith([...objValue, ...srcValue], isEqualCustomizer);
    }
    return srcValue;
  };

  return _.mergeWith(serviceNasMappings, nasMappingsInNasYml, customizer);
}