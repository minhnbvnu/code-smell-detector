function check_vars() {
  return Promise.all(
    require_env.map(
      async (envName) => {
        if (!_is_Set(envName)) {
          error(`variable ${envName} not set`);
        }
        info(`${envName} : ${process.env[envName]}`);
        return process.env[envName];
      }
    )
  )
}