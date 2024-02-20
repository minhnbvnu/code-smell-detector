function createValidBundle() {
    const validBundle = new FluentBundle();
    validBundle.addResource(
      new FluentResource("example-id = Example localized text\n")
    );
    return validBundle;
  }