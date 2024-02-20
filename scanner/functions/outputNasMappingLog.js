function outputNasMappingLog(baseDir, nasMappingPath, localNasDir) {
  console.log(green(`Fun add ${path.relative(baseDir, localNasDir)} to ${nasMappingPath}`));
}