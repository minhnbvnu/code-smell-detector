async function getVisitor(returnFakeIfMissingConfig = false) {

  if (!visitor) {
    const profile = await getProfileFromFile();

    // use fake if it is in a ci environment or has never been configured
    if (_.isEmpty(profile)) {

      if (detectMocha()) {
        return fakeMocha;
      }

      if (ci.isCI) {
        real.pageview(`/downloaded/ci/${ci.name}`).send();
      }

      return fake;
    }

    if (profile.report === undefined) {
      if (returnFakeIfMissingConfig) { return fake; }

      if (detectMocha()) {
        return fakeMocha;
      }

      visitor = real;
    }

    if (profile.report === true) {
      visitor = real;
    } else {
      visitor = fake;
    }
  }

  return visitor;
}