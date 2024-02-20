function deprecationsWithoutSource() {
  return [
    {
      id: 'deprecation-1',
      message: 'Deprecation 1',
      url: 'http://www.emberjs.com',
      count: 2,
      sources: [
        {
          stackStr: 'stack-trace',
          map: null,
        },
        {
          stackStr: 'stack-trace-2',
          map: null,
        },
      ],
    },
  ];
}