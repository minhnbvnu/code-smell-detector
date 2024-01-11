async function updateProcessEnv(launchEnv) {
  let envToAssign;
  if (launchEnv) {
    if (shouldGetEnvFromShell(launchEnv)) {
      envToAssign = await getEnvFromShell(launchEnv);
    } else if (launchEnv.PWD || launchEnv.PROMPT || launchEnv.PSModulePath) {
      envToAssign = launchEnv;
    }
  }

  if (envToAssign) {
    for (let key in process.env) {
      if (!ENVIRONMENT_VARIABLES_TO_PRESERVE.has(key)) {
        delete process.env[key];
      }
    }

    for (let key in envToAssign) {
      if (
        !ENVIRONMENT_VARIABLES_TO_PRESERVE.has(key) ||
        (!process.env[key] && envToAssign[key])
      ) {
        process.env[key] = envToAssign[key];
      }
    }

    if (envToAssign.ATOM_HOME && fs.existsSync(envToAssign.ATOM_HOME)) {
      process.env.ATOM_HOME = envToAssign.ATOM_HOME;
    }
  }
}