function getRectangles() {
    let rects = new Map();
    rectangles.forEach((rect, id) => {
      let pos = physicsLayout.getNodePosition(id);
      let {width, height} = rect;
      const inflatedRect = new Rect({
        id, 
        left: pos.x + rect.x,
        top: pos.y + rect.y,
        dx: rect.x,
        dy: rect.y,
        width,
        height,
      });
      rects.set(id, inflatedRect);
    });

    return rects;
  }