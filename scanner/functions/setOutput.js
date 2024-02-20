function setOutput(key, value) {
    core.info(`State ${key} = ${value}`);
    core.setOutput(key, value);
  }