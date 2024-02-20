function getTextFrameCss(thisFrame, abBox, pgData, settings) {
  var styles = '';
  var classes = '';
  // Using AI style of first paragraph in TextFrame to get information about
  // tracking, justification and top padding
  // TODO: consider positioning paragraphs separately, to handle pgs with different
  //   justification in the same text block
  var firstPgStyle = pgData[0].aiStyle;
  var lastPgStyle = pgData[pgData.length - 1].aiStyle;
  var isRotated = firstPgStyle.rotated;
  var aiBounds = isRotated ? getUntransformedTextBounds(thisFrame) : thisFrame.geometricBounds;
  var htmlBox = convertAiBounds(shiftBounds(aiBounds, -abBox.left, abBox.top));
  var thisFrameAttributes = parseDataAttributes(thisFrame.note);
  // estimated space between top of HTML container and character glyphs
  // (related to differences in AI and CSS vertical positioning of text blocks)
  var marginTopPx = (firstPgStyle.leading - firstPgStyle.size) / 2 + firstPgStyle.spaceBefore;
  // estimated space between bottom of HTML container and character glyphs
  var marginBottomPx = (lastPgStyle.leading - lastPgStyle.size) / 2 + lastPgStyle.spaceAfter;
  // var trackingPx = firstPgStyle.size * firstPgStyle.tracking / 1000;
  var htmlL = htmlBox.left;
  var htmlT = Math.round(htmlBox.top - marginTopPx);
  var htmlW = htmlBox.width;
  var htmlH = htmlBox.height + marginTopPx + marginBottomPx;
  var alignment, v_align, vertAnchorPct;

  if (firstPgStyle.justification == 'Justification.LEFT') {
    alignment = 'left';
  } else if (firstPgStyle.justification == 'Justification.RIGHT') {
    alignment = 'right';
  } else if (firstPgStyle.justification == 'Justification.CENTER') {
    alignment = 'center';
  }

  if (thisFrame.kind == TextType.AREATEXT) {
    v_align = 'top'; // area text aligned to top by default
    // EXPERIMENTAL feature
    // Put a box around the text, if the text frame's textPath is styled
    styles += convertAreaTextPath(thisFrame);
  } else {  // point text
    // point text aligned to midline (sensible default for chart y-axes, map labels, etc.)
    v_align = 'middle';
    htmlW += 22; // add a bit of extra width to try to prevent overflow
  }

  if (thisFrameAttributes.valign && !isRotated) {
    // override default vertical alignment, unless text is rotated (TODO: support other )
    v_align = thisFrameAttributes.valign;
    if (v_align == 'center') {
      v_align = 'middle';
    }
  }

  if (isRotated) {
    vertAnchorPct = (marginTopPx + htmlBox.height * 0.5 + 1) / (htmlH) * 100; // TODO: de-kludge
    styles += getTransformationCss(thisFrame, vertAnchorPct);
    // Only center alignment currently works well with rotated text
    // TODO: simplify alignment of rotated text (some logic is in convertAiTextStyle())
    v_align = 'middle';
    alignment = 'center';
    // text-align of point text set to 'center' in convertAiTextStyle()
  }

  if (v_align == 'bottom') {
    var bottomPx = abBox.height - (htmlBox.top + htmlBox.height + marginBottomPx);
    styles += 'bottom:' + formatCssPct(bottomPx, abBox.height) + ';';
  } else if (v_align == 'middle') {
    // https://css-tricks.com/centering-in-the-unknown/
    // TODO: consider: http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/
    styles += 'top:' + formatCssPct(htmlT + marginTopPx + htmlBox.height / 2, abBox.height) + ';';
    styles += 'margin-top:-' + roundTo(marginTopPx + htmlBox.height / 2, 1) + 'px;';
  } else {
    styles += 'top:' + formatCssPct(htmlT, abBox.height) + ';';
  }
  if (alignment == 'right') {
    styles += 'right:' + formatCssPct(abBox.width - (htmlL + htmlBox.width), abBox.width) + ';';
  } else if (alignment == 'center') {
    styles += 'left:' + formatCssPct(htmlL + htmlBox.width / 2, abBox.width) + ';';
    // setting a negative left margin for horizontal placement of centered text
    // using percent for area text (because area text width uses percent) and pixels for point text
    if (thisFrame.kind == TextType.POINTTEXT) {
      styles += 'margin-left:-' + roundTo(htmlW / 2, 1) + 'px;';
    } else {
      styles += 'margin-left:' + formatCssPct(-htmlW / 2, abBox.width )+ ';';
    }
  } else {
    styles += 'left:' + formatCssPct(htmlL, abBox.width) + ';';
  }

  classes = nameSpace + getLayerName(thisFrame.layer) + ' ' + nameSpace + 'aiAbs';
  if (thisFrame.kind == TextType.POINTTEXT) {
    classes += ' ' + nameSpace + 'aiPointText';
    // using pixel width with point text, because pct width causes alignment problems -- see issue #63
    // adding extra pixels in case HTML width is slightly less than AI width (affects alignment of right-aligned text)
    styles += 'width:' + roundTo(htmlW, cssPrecision) + 'px;';
  } else if (settings.text_responsiveness == 'fixed') {
    styles += 'width:' + roundTo(htmlW, cssPrecision) + 'px;';
  } else {
    // area text uses pct width, so width of text boxes will scale
    // TODO: consider only using pct width with wider text boxes that contain paragraphs of text
    styles += 'width:' + formatCssPct(htmlW, abBox.width) + ';';
  }
  return 'class="' + classes + '" style="' + styles + '"';
}