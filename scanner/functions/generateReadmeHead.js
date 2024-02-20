function generateReadmeHead(state) {
  return [
    {type: 'html', value: '<!--This file is generated-->'},
    {
      type: 'heading',
      depth: 1,
      children: [{type: 'text', value: state.name}]
    }
  ]
}