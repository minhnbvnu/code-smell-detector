function Globals() {
  let globals = new Map([
    [NaN, {type: 'Identifier', name: 'NaN'}],
    [null, {type: 'Literal', value: null}],
    [undefined, {type: 'Identifier', name: 'undefined'}],
    [Infinity, {type: 'Identifier', name: 'Infinity'}],
    [(0,eval)('this'), {
      type: 'CallExpression',
      callee: {
        type: 'SequenceExpression',
        expressions: [
          {type: 'Literal', value: 0},
          {type: 'Identifier', name: 'eval'}
        ]
      },
      "arguments": [{type: 'Literal', value: 'this'}]
    }]
  ])

  return crawl(globals, (0, eval)('this'))
}