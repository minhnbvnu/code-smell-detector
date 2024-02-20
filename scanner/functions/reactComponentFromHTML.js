function reactComponentFromHTML(html) {
  var jsx = '/** @jsx React.DOM */ ' + converter.convert(html);
  try {
    return JSXTransformer.exec(jsx);
  } catch (ex) {
    throw new Error('Something bad happened when transforming HTML to JSX: ' + ex);
    console.log(jsx);
    window.location.reload()
  }
}