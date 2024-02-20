function crash_report(options, tracker, view) {
  if (isBlank(options.crashReport)) {
    options.crashReport = new lazy.CrashReport({}, tracker, view.configuration);
  }
  return options.crashReport;
}