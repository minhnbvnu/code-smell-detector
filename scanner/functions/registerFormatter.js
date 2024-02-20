function registerFormatter({ opts, agent, winston }) {
  const instrumentedFormatter = nrWinstonFormatter(agent, winston)

  if (opts.format) {
    opts.format = winston.format.combine(instrumentedFormatter(), opts.format)
  } else {
    // The default formatter for Winston is the JSON formatter. If the user
    // has not provided a formatter through opts.format, we must emulate the
    // default. Otherwise, the message symbol will not get attached to log
    // messages and transports, e.g. the "Console" transport, will not be able
    // to output logs correctly.
    opts.format = winston.format.combine(instrumentedFormatter(), winston.format.json())
  }
}