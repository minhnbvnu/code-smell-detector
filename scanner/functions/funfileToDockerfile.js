async function funfileToDockerfile(funfilePath, runtime, serviceName, functionName) {

  const content = await fs.readFile(funfilePath, 'utf8');

  const funfile = DockerfileParser.parse(content);

  const dockerfile = [];

  for (let instruction of funfile.getInstructions()) {

    const ins = instruction.getInstruction();

    if (_.includes(RESERVED_DOCKER_CMD, ins)) {
      throw new Error(`Currently, Funfile does not support the semantics of '${ins}'. 
If you have a requirement, you can submit the issue at https://github.com/alibaba/funcraft/issues.`);
    }

    if (ins.toUpperCase() === 'RUNTIME') {
      const runtimeArgs = instruction.getArguments();

      if (runtimeArgs.length !== 1) {
        throw new Error('invalid RUNTIME for Funfile');
      }

      const runtimeOfFunfile = runtimeArgs[0].getValue();

      if (runtimeOfFunfile !== runtime) {
        console.warn(yellow(`\nDetectionWarning: The 'runtime' of '${serviceName}/${functionName}' in your template.yml is inconsistent with that in Funfile.`));
      }

      const imageName = await dockerOpts.resolveRuntimeToDockerImage(runtimeOfFunfile, true);
      dockerfile.push('FROM ' + await dockerOpts.resolveImageNameForPull(imageName) + ` as ${runtimeOfFunfile}`);
    } else {
      const range = instruction.getRange();

      dockerfile.push(instruction.getRangeContent(range));
    }
  }

  return dockerfile.join('\n');
}