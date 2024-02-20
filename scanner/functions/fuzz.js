function fuzz(err, data) {
  if (err) {
    return console.error("File not found: " + err.path);
  }

  let parse;
  if (program.runtime) {
    let { FluentResource } = require("../fluent-bundle/esm/index.js");
    parse = source => new FluentResource(source);
  } else {
    parse = require("../fluent-syntax/esm/index.js").parse;
  }

  const source = data.toString();
  const mutations = new Set();

  let i = 1;

  while (i <= program.repetitions) {
    const mutated = fuzzer.mutate.string(source);

    if (mutations.has(mutated)) {
      continue;
    }

    mutations.add(mutated);

    const progress = Math.round((i / program.repetitions) * 100);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`mutation ${i} ... ${progress}%`);

    try {
      parse(mutated);
    } catch (e) {
      console.log(`! mutation ${i}`);
      console.log(e);
      console.log(mutated);
      break;
    }

    i++;
  }
}