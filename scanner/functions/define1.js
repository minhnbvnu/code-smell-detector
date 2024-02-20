function define1(runtime, observer) {
    const main = runtime.module();
    main.define("module 1", async () => runtime.module(await promise2));
    main.define("b", ["module 1", "@variable"], (_, v) => v.import("b", _));
    main.variable(observer("a")).define("a", ["b"], b => b + 1);
    return main;
  }