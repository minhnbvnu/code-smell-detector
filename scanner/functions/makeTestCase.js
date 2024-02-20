function makeTestCase(name) {
  return {
    name,
    frames: [
      require(`@xviz/conformance/inputs/${name}/1-frame.json`),
      require(`@xviz/conformance/inputs/${name}/2-frame.json`)
    ],
    goldenImage: `modules/conformance/inputs/${name}/output.png`
  };
}