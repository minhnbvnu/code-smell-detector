function interceptedLoad(request, parent, isMain) {
    // console.log("REQUIRE: " + request);
    let stubbed = ReactNativeStub(request, parent, isMain);
    stubbed = stubbed || (request, parent, isMain);
    if (stubbed) return stubbed;

    return originalLoad(request, parent, isMain);
  }