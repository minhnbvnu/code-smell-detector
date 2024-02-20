async function generateRepackagedBootstrap(bootstrapPath, bootstrapContent) {
  await fs.copy(bootstrapPath, bootstrapPath + '.bak');
  await fs.writeFile(bootstrapPath, bootstrapContent);
}