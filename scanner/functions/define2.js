function define2(runtime, observer) {
    const main = runtime.module();
    main.define("module 1", async () => runtime.module(await promise3));
    main.define("c", ["module 1", "@variable"], (_, v) => v.import("c", _));
    main.variable(observer("b")).define("b", ["c"], c => c + 1);
    return main;
  }