function nextStream() {
  const args = queue.shift();
  if (args) {
    const options = utils.last(args);

    options.afterDequeue();
    args.stream = runStream(...args);
    options.afterStreamStart();
  }
}