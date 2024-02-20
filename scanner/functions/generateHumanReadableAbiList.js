async function generateHumanReadableAbiList(env, api, TASK_COMPILE){
  await env.run(TASK_COMPILE);
  const _artifacts = await getAllArtifacts(env);
  const list = api.abiUtils.generateHumanReadableAbiList(_artifacts)
  api.saveHumanReadableAbis(list);
}