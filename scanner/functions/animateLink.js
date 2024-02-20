function animateLink(link, maxT) {
    var frame = 0;
    let from = layout.getNodePosition(link.fromId);
    let to = layout.getNodePosition(link.toId);

    const dRatio = getLinkScore(link)
    const strokeWidth = 8 * dRatio + 2;
    const color = Math.round((200 - 75) * (1 - dRatio) + 75);

    let api = {
      step,
      isDone: false
    }
    return api;

    function step() {
      let t = ease(frame/maxT);
      let x = from.x * (1 - t) + to.x * t;
      let y = from.y * (1 - t) + to.y * t;
      let linkInfo = links.get(link.id);
      let pathData = `M${from.x},${from.y} L${x},${y}`;
      if (!linkInfo) {
        const ui = svg('path', {
          class: 'link-ui',
          id: link.id,
          'stroke-width': strokeWidth,
          fill: 'black',
          stroke: `rgb(${color}, ${color}, ${color})`,
          d: pathData 
        });
        edgeContainer.appendChild(ui);

        links.set(link.id, {ui, link});
      } else {
        linkInfo.ui.attr('d', pathData);
      }
      frame += 1;
      if (frame > maxT) {
        api.isDone = true;
      }
    }
  }