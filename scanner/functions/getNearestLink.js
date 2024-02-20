function getNearestLink(x, y) {
    if (!linkIndex) return;

    pt.x = x; pt.y = y;
    let svgP = pt.matrixTransform(scene.getScreenCTM().inverse());
    let link = linkIndex.findNearestLink(svgP.x, svgP.y, 30);
    if (link) return link.id;
  }