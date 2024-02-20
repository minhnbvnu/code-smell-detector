async function convertDockerfileToBuildkitFormat(dockerfilePath, fromSrcToDstPairs, baseDir, targetBuildStage) {
  const originalContent = await fs.readFile(dockerfilePath, 'utf8');
  if (!targetBuildStage || !fromSrcToDstPairs) {
    debug('There is no output args.');
    return originalContent;
  }
  const parsedContent = DockerfileParser.parse(originalContent);

  const content = [];
  const stages = [];
  for (let instruction of parsedContent.getInstructions()) {
    const ins = instruction.getInstruction();
    const range = instruction.getRange();

    content.push(instruction.getRangeContent(range));
    if (ins.toUpperCase() === 'FROM') {
      const stage = instruction.getArgumentsContent().toString().split(' as ')[1];
      if (stage) {
        stages.push(stage);
      }
    }
  }
  
  content.push(`FROM scratch as ${targetBuildStage}`);
  fromSrcToDstPairs.forEach( pair => {
    stages.forEach( stage => {
      content.push(`COPY --from=${stage} ${pair.src} ${baseDir === pair.dst ? './' : path.relative(baseDir, pair.dst)}`);
    });
  });
  
  return content.join('\n');
}