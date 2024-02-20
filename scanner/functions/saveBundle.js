function saveBundle(output, bundle, args) {
  return Promise.resolve(
    output.save(bundle, args, log)
  ).then(() => bundle);
}