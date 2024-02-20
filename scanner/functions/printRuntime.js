function printRuntime(data) {
  const { FluentResource } = require("../fluent-bundle/esm/index.js");
  const res = new FluentResource(data.toString());
  console.log(JSON.stringify(res, null, 4));
}