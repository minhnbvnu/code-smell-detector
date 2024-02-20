function Build(options) {
  return Promise.all([
    lib(),
    es(),
    //bower(),
    //dist(),
  ])
  //.then(() => copy(distRoot, bowerRoot));
}