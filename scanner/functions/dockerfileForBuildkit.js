async function dockerfileForBuildkit(runtime, fromSrcToDstPairsInOutput, fromSrcToDstPairsInBuild, contentDir, targetBuildStage, envs, cmd, workdir) {
  const image = await dockerOpts.resolveRuntimeToDockerImage(runtime, true);
  
  const content = [];
  content.push('FROM ' + await dockerOpts.resolveImageNameForPull(image) + ` as ${runtime}`);
  if (workdir) {
    content.push(`WORKDIR ${workdir}`);
  }

  if (envs) {
    envs.forEach( e => content.push(`ENV ${e}`));
  }
  if (fromSrcToDstPairsInBuild) {
    fromSrcToDstPairsInBuild.forEach( pair => content.push(`COPY ${(contentDir === pair.src || path.resolve(contentDir) === pair.src) ? './' : path.relative(contentDir, pair.src)} ${pair.dst}`));
  }
  if (cmd) {
    content.push(`RUN ${cmd}`);
  }

  if (fromSrcToDstPairsInOutput) {
    content.push(`FROM scratch as ${targetBuildStage}`);

    fromSrcToDstPairsInOutput.forEach( pair => content.push(`COPY --from=${runtime} ${pair.src} ${(contentDir === pair.dst || path.resolve(contentDir) === pair.dst) ? './' : path.relative(contentDir, pair.dst)}`));
  }
  return content.join('\n');
}