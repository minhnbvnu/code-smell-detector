function command(args) {
  // Validate the message flow
  const options = {verbose: !args.condensed};

  if (!args.condensed) {
    options.invalidCallback = (t, e, m) => {
      printValidationError(t, e, m, args);
    };
  }

  const validator = new XVIZSessionValidator(options);

  let printed = false;
  const printSummary = () => {
    if (!printed) {
      printErrorSummary(validator.stats, args);
      printed = true;
    }
  };

  // Report validation as we go
  const reportValidation = {
    onMetadata: msg => {
      if (args.metadata) {
        printSummary();
      }
    },
    onTransformLogDone: msg => {
      printSummary();
    },
    onClose: () => {
      printSummary();
    }
  };

  // The middleware stack handle all messages
  const stack = [validator, reportValidation];

  // Everything async from here...
  openSource(args, stack);
}