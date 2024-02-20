function define3(runtime, observer) {
    const main = runtime.module();
    main.variable(observer("c")).define("c", [], () => 1);
    return main;
  }