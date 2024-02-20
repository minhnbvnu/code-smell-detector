function createScratchSVG(width, height) {
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg:svg');
    svg.setAttributeNS(null, 'version', '1.1');
    svg.setAttributeNS(null, 'width', width + 'px');
    svg.setAttributeNS(null, 'height', height + 'px');
    svg.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);
    return svg;
  }