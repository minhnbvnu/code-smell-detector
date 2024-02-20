function customize(opts /*: Options */) {
  var renderers = opts.renderers || {};

  return function markings(strings /*: Array<string> */ /*::, ...values: Array<ReactNode> */) {
    var values = Array.prototype.slice.call(arguments, 1);
    var input = stripIndent(strings.join(PLACEHOLDER));
    var parser = new Parser();
    var ast = parser.parse(input);

    if (!validate(ast)) {
      throw new Error('react-markings cannot interpolate React elements non-block positions');
    }

    var index = 0;
    var renderer = new Renderer({
      renderers: Object.assign({}, renderers, {
        Paragraph: function(props) {
          if (props.children.length === 1 && props.children[0] === PLACEHOLDER) {
            var value = values[index];
            index = index + 1 < values.length ? index + 1 : 0;
            return value;
          } else if (renderers.Paragraph) {
            return renderers.Paragraph(props);
          } else if (renderers.paragraph) {
            return renderers.paragraph(props);
          } else {
            return React.createElement('p', {}, props.children);
          }
        },
      })
    });

    return React.createElement('div', {}, renderer.render(ast));
  }
}