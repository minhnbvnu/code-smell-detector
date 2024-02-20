function getSelectedArray(o) {
  return flow(
    map((v, k) => {
      return v ? k : null;
    }),
    reject(_.isEmpty)
  )(o);
}