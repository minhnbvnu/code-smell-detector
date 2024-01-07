function build() {
  buildCSS()
    .then(buildDocs)
    .catch((err) => console.log(err));
}