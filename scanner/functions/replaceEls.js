function replaceEls(html, elProperties) {
    var pattern = elProperties.type === 'void' ? '<' + elProperties.tag + '\\b([^>]*)\\/?>' : '<' + elProperties.tag + '\\b([^>]*)>([\\s\\S]*?)<\\/' + elProperties.tag + '>',
        regex = new RegExp(pattern, 'gi'),
        markdown = '';
    if(typeof elProperties.replacement === 'string') {
      markdown = html.replace(regex, elProperties.replacement);
    }
    else {
      markdown = html.replace(regex, function(str, p1, p2, p3) {
        return elProperties.replacement.call(this, str, p1, p2, p3);
      });
    }
    return markdown;
  }