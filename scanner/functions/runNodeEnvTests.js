function runNodeEnvTests(nodeEnvData, t) {
  t.match(nodeEnvData['runtime.version'], /^v\d+.\d+.\d+/, "Node version matches 'v99.99.99' format");

  t.ok(
    ['IBM SDK for Node.js', 'Node.js'].indexOf(nodeEnvData['runtime.name']) != -1,
    'Node runtime name is recognised'
  );

  if (nodeEnvData['runtime.vendor']) {
    t.equal(nodeEnvData['runtime.vendor'], 'IBM', 'Node runtime vendor recognised as IBM');
  }

  // NOTE (acollins): This was failing as the current version no. is 1.0.12-dev.201605120942 but test expected it to be 1.0.12-dev.99.201605120942. I've been informed that this is an error with the test so I've changed the regex to reflect this

  if (nodeEnvData['appmetrics.version']) {
    t.match(
      nodeEnvData['appmetrics.version'],
      /^\d+\.\d+\.\d+(-dev)?\.\d{12}$/,
      "Appmetrics version matches '99.99.99(-dev).123456789012' format"
    );
  }

  if (nodeEnvData['agentcore.version']) {
    t.match(
      nodeEnvData['agentcore.version'],
      /^\d+\.\d+\.\d+\.\d{12}$/,
      "Agent core version matches '99.99.99.123456789012' format"
    );
  }

  // NOTE(mjt): heap.size.limit, max.semi.space.size and max.old.space.size were added in
  // appmetrics 1.0.4 (required field in this version onwards)
  // NOTE(ignasbol): max.heap.size included as well as part of 1.0.4
  if (nodeEnvData['heap.size.limit']) {
    t.ok(
      isInteger(nodeEnvData['heap.size.limit']),
      'heap.size.limit is an integer (value was: ' + nodeEnvData['heap.size.limit'] + ')'
    );

    t.ok(parseInt(nodeEnvData['heap.size.limit']) > 0, 'heap.size.limit is positive');
    t.ok(
      isInteger(nodeEnvData['max.semi.space.size']),
      'max.semi.space.size is an integer (value was: ' + nodeEnvData['max.semi.space.size'] + ')'
    );
    t.ok(parseInt(nodeEnvData['max.semi.space.size']) > 0, 'max.semi.size is positive');

    t.ok(
      isInteger(nodeEnvData['max.old.space.size']),
      'max.old.space.size is an integer (value was: ' + nodeEnvData['max.old.space.size'] + ')'
    );
    t.ok(parseInt(nodeEnvData['max.old.space.size']) > 0, 'max.old.space.size is positive');

    if (semver.gt(process.version, '12.0.0')) {
      t.skip();
    } else if (semver.gt(process.version, '10.0.0')) {
      // heap size limit is now scaled by a factor - see
      // https://github.com/nodejs/node/blob/v10.x/deps/v8/src/heap/heap.cc#L250
      var maxHeapGuess = 2 * parseInt(nodeEnvData['max.semi.space.size']) + parseInt(nodeEnvData['max.old.space.size']);
      var actualHeapSizeLimit = parseInt(nodeEnvData['heap.size.limit']);
      t.ok(actualHeapSizeLimit >= maxHeapGuess,
        'Values for max.old.space.size and max.semi.space.size approximately match heap.size.limit');
      t.ok(actualHeapSizeLimit < (maxHeapGuess * 1.05),
        'Values for max.old.space.size and max.semi.space.size approximately match heap.size.limit (2)');
    } else if (semver.gt(process.version, '6.5.0')) {
      // issue 283
      t.ok(
        2 * parseInt(nodeEnvData['max.semi.space.size']) + parseInt(nodeEnvData['max.old.space.size']) ===
          parseInt(nodeEnvData['heap.size.limit']),
        'Values for max.old.space.size and max.semi.space.size match heap.size.limit'
      );
    } else {
      t.ok(
        4 * parseInt(nodeEnvData['max.semi.space.size']) + parseInt(nodeEnvData['max.old.space.size']) ===
          parseInt(nodeEnvData['heap.size.limit']),
        'Values for max.old.space.size and max.semi.space.size match heap.size.limit'
      );
    }

    t.ok(
      isInteger(nodeEnvData['max.heap.size']),
      'max.heap.size is an integer (value was: ' + nodeEnvData['max.heap.size'] + ')'
    );

    t.ok(parseInt(nodeEnvData['max.heap.size']) > 0, 'max.heap.size is positive');
  }

  var requiredKeys = ['runtime.version', 'runtime.name', 'command.line.arguments'];
  requiredKeys.forEach(function(key) {
    t.ok(nodeEnvData.hasOwnProperty(key), 'Node environment data contains ' + key);
  });
}