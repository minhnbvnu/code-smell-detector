async function eventPriority(options) {
  if (isEventString(options)) { return options.event; }

  let eventFile;

  if (options.eventStdin) {
    eventFile = '-';
  } else if (options.eventFile) {
    eventFile = path.resolve(process.cwd(), options.eventFile);
  } else if (options.event && fs.pathExistsSync(options.event)) {
    console.warn(red(`Warning: Using -e to specify the event file path will be replaced by -f in the future.`));
    eventFile = path.resolve(process.cwd(), options.event);
  }

  return await getEvent(eventFile);
}