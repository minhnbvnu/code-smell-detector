function makeGetEnvironment() {
  let environment;

  return function() {
    if (!environment) {
      environment = {
        ui: new UI(),
        settings: new ProjectSettings()
      };
    }
    return environment;
  };
}