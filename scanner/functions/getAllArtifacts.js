async function getAllArtifacts(env){
  const all = [];
  const qualifiedNames = await env.artifacts.getArtifactPaths();
  for (const name of qualifiedNames){
    all.push(require(name));
  }
  return all;
}