function deprecationsWithSource() {
  return [
    {
      id: 'deprecation-1',
      message: 'Deprecation 1',
      url: 'http://www.emberjs.com',
      count: 2,
      hasSourceMap: true,
      sources: [
        {
          stackStr: 'stack-trace',
          map: {
            source: 'path-to-file.js',
            line: 1,
            fullSource: 'http://path-to-file.js',
          },
        },
        {
          stackStr: 'stack-trace-2',
          map: {
            source: 'path-to-second-file.js',
            line: 2,
            fullSource: 'http://path-to-second-file.js',
          },
        },
      ],
    },
  ];
}