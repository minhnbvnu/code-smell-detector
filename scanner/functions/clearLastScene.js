function clearLastScene() {
    clear(nodeContainer);
    clear(edgeContainer);

    document.removeEventListener('mousemove', onMouseMove);
    svgEl.removeEventListener('click', onSceneClick);
    if (layout) layout.off('ready', drawLinks);
    if (graph) graph.off('changed', onGraphStructureChanged);
    if (linkAnimator) linkAnimator.dispose();
  }