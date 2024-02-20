function buildFile(layout, metadata, rawContent) {
  return [
    '/**',
    ' * @generated',
    ' */',
    'var React = require("React");',
    'var Layout = require("' + layout + '");',
    rawContent && 'var content = ' + backtickify(rawContent) + ';',
    'var Post = React.createClass({',
    rawContent && '  statics: { content: content },',
    '  render: function() {',
    '    return (',
    '      <Layout metadata={' + JSON.stringify(metadata) + '}>',
    rawContent && '        {content}',
    '      </Layout>',
    '    );',
    '  }',
    '});',
    'module.exports = Post;'
  ].filter(e => e).join('\n');
}