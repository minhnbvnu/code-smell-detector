function formatBanner(message, options) {
  options = options || {};
  _.defaults(options, {
    chalkFunction: (fn) => fn,
    width: 80,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 2,
    paddingRight: 2,
  });

  var width = options.width;
  var marginLeft = options.marginLeft;
  var marginRight = options.marginRight;
  var paddingTop = options.paddingTop;
  var paddingBottom = options.paddingBottom;
  var paddingLeft = options.paddingLeft;
  var paddingRight = options.paddingRight;

  var horizSpacing = marginLeft + paddingLeft + paddingRight + marginRight;
  // 2 for the banner borders
  var maxLineWidth = width - horizSpacing - 2;
  var wrap = wordwrap(maxLineWidth);
  var body = wrap(message);

  var left = spaces(marginLeft) + VERTICAL_LINE + spaces(paddingLeft);
  var right = spaces(paddingRight) + VERTICAL_LINE + spaces(marginRight);
  var bodyLines = _.flattenDeep([
    arrayOf('', paddingTop),
    body.split('\n'),
    arrayOf('', paddingBottom),
  ]).map(function(line) {
    var padding = spaces(Math.max(0, maxLineWidth - line.length));
    return left + options.chalkFunction(line) + padding + right;
  });

  var horizontalBorderLine = repeatString(
    HORIZONTAL_LINE,
    width - marginLeft - marginRight - 2
  );
  var top = spaces(marginLeft) + TOP_LEFT + horizontalBorderLine + TOP_RIGHT +
    spaces(marginRight);
  var bottom = spaces(marginLeft) + BOTTOM_LEFT + horizontalBorderLine +
    BOTTOM_RIGHT + spaces(marginRight);
  return _.flattenDeep([top, bodyLines, bottom]).join('\n');
}