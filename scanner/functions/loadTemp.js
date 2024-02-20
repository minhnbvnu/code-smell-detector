function loadTemp(LODOP, code) {
  var parser = /LODOP\.([^(]+)\(([^\n]+)\);/i;
  code.split("\n").forEach(line => {
    const res = parser.exec(line.trim());
    if (!res) return;
    const fn = LODOP[res[1]];
    if (fn) {
      let arr = [];
      try {
        const fakeFn = new Function(`return [${res[2]}]`);
        arr = fakeFn();
      } catch { }
      fn.apply(LODOP, arr);
    }
  });
}