function drawLinks() {
    progress.done();
    linkAnimator = createLinkAnimator(graph, layout, edgeContainer);
    document.addEventListener('mousemove', onMouseMove);
    svgEl.addEventListener('click', onSceneClick);
    let radius = 42;
    linkIndex = buildLinkIndex(graph, layout, radius);
    // let points = linkIndex.getPoints();
    // points.forEach(point => {
    //   scene.appendChild(svg('circle', {
    //     cx: point.x,
    //     cy: point.y,
    //     r: radius,
    //     fill: 'transparent',
    //   }))
    // })
  }