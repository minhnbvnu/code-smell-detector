function generateSrcDstPairsFromMounts(mountsInDocker) {
  const fromSrcToDstPairsInBuild = [];
  const fromSrcToDstPairsInOutput = [];

  mountsInDocker.forEach( m => {
    fromSrcToDstPairsInBuild.push({'src': m.Source, 'dst': m.Target});
    if (!m.ReadOnly) {
      fromSrcToDstPairsInOutput.push({'src': m.Target, 'dst': m.Source});
    }
  });
  return {fromSrcToDstPairsInBuild, fromSrcToDstPairsInOutput};
}