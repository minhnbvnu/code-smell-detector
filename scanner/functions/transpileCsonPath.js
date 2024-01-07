function transpileCsonPath(csonPath) {
  const jsonPath = csonPath.replace(/cson$/g, 'json');
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      CompileCache.addPathToCache(csonPath, CONFIG.atomHomeDirPath)
    )
  );
  fs.unlinkSync(csonPath);
}