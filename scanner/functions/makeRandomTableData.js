function makeRandomTableData(builder, opts, depth = 0, stats = {count: 0}) {
  const {maxDepth = 1, maxNodes = 100} = opts;

  if (depth > maxDepth) {
    return;
  }

  const n = Math.pow(maxNodes, 1 / maxDepth) * Math.random();

  for (let i = 0; i < n; i++) {
    const id = `node-${stats.count}`;

    const command = depth ? 'child' : 'row';
    const row = builder[command](id, makeRandomColumnValues(opts.columns));
    stats.count++;

    makeRandomTableData(row, opts, depth + 1, stats);
  }
}