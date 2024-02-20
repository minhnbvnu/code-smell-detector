function matchingSimulator(simulators, simulatorName) {
  for (let i = simulators.length - 1; i >= 0; i--) {
    if (simulators[i].name === simulatorName) {
      return simulators[i];
    }
  }
}