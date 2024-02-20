function addLabel(node, root, addingNode, marginX, marginY) {
  // If the node has 'useDef' meta data, we rely on that
  if (node.useDef) {
    root.append('use').attr('xlink:href', '#' + node.useDef);
    return;
  }
  // Add the rect first so that it appears behind the label
  var label = node.label;
  var rect = root.append('rect');
  if (node.width) {
    rect.attr('width', node.width);
  }
  if (node.height) {
    rect.attr('height', node.height);
  }

  var labelSvg = root.append('g'),
      innerLabelSvg;

  if (label[0] === '<') {
    addForeignObjectLabel(label, labelSvg);
    // No margin for HTML elements
    marginX = marginY = 0;
  } else {
    innerLabelSvg = addTextLabel(label,
                                 labelSvg,
                                 Math.floor(node.labelCols),
                                 node.labelCut);
    applyStyle(node.labelStyle, innerLabelSvg);
  }

  var labelBBox = labelSvg.node().getBBox();
  labelSvg.attr('transform',
                'translate(' + (-labelBBox.width / 2) + ',' + (-labelBBox.height / 2) + ')');

  var bbox = root.node().getBBox();

  rect
    .attr('rx', node.rx ? node.rx : 5)
    .attr('ry', node.ry ? node.ry : 5)
    .attr('x', -(bbox.width / 2 + marginX))
    .attr('y', -(bbox.height / 2 + marginY))
    .attr('width', bbox.width + 2 * marginX)
    .attr('height', bbox.height + 2 * marginY)
    .attr('fill', '#fff');

  if (addingNode) {
    applyStyle(node.style, rect);

    if (node.fill) {
      rect.style('fill', node.fill);
    }

    if (node.stroke) {
      rect.style('stroke', node.stroke);
    }

    if (node['stroke-width']) {
      rect.style('stroke-width', node['stroke-width'] + 'px');
    }

    if (node['stroke-dasharray']) {
      rect.style('stroke-dasharray', node['stroke-dasharray']);
    }

    if (node.href) {
      root
        .attr('class', root.attr('class') + ' clickable')
        .on('click', function() {
          window.open(node.href);
        });
    }
  }
}