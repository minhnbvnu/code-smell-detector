function runChild() {
  const fs = require('fs');

  const NodeTranspiler = require('../lib/NodeTranspiler');
  const nodeTranspiler = new NodeTranspiler();

  let overwrite;

  process.on('message', m => {
    const res = {};
    if (m.cmd === 'next' && fs.lstatSync(m.filename).isFile()) {
      const src = fs.readFileSync(m.filename);
      if (NodeTranspiler.shouldCompile(src)) {
        const code = nodeTranspiler.transformWithCache(src, m.filename);
        if (overwrite) {
          fs.writeFileSync(m.filename, code);
        }
        res.transpiled = true;
      } else {
        res.skipped = true;
      }
    } else if (m.cmd === 'init') {
      overwrite = m.overwrite;
    }
    process.send(res);
  });
}