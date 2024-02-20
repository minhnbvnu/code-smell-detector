async function detectFramework(codeDir) {
  for (const framework of frameworks) {
    const runtime = framework.runtime;
    const runtimeChecker = runtimeCheckers[runtime];

    if (!runtimeChecker) {
      throw new Error('could not found runtime checker');
    }

    const checkResult = await checkRule(codeDir, runtimeChecker);

    if (checkResult) {
      const detectors = framework.detectors;

      // no need to detect
      if (_.isEmpty(detectors)) { return framework; }

      const match = await checkRules(codeDir, detectors);
      if (match) {
        return framework;
      }
    }
  }

  return null;
}