function transpileCoffeeScriptPath(coffeePath) {
  const jsPath = coffeePath.replace(/coffee$/g, 'js');
  fs.writeFileSync(
    jsPath,
    CompileCache.addPathToCache(coffeePath, CONFIG.atomHomeDirPath)
  );
  fs.unlinkSync(coffeePath);
}