function timelineInit() {
  TweenMax.set(stem_1, {
    scaleY: 1,
    rotation: 0,
    transformOrigin: "center bottom"
  });
  TweenMax.set(head, {
    y: 0,
    x: 0,
    rotation: 0,
    transformOrigin: "center bottom"
  });
  TweenMax.set(leaf_group_1, {
    y: 0,
    x: 0,
    rotation: 0,
    transformOrigin: "right bottom"
  });
  TweenMax.set(leaf_group_2, {
    y: 0,
    x: 0,
    rotation: 0,
    transformOrigin: "right bottom"
  });
  TweenMax.set(leaf_group_3, {
    y: 0,
    x: 0,
    rotation: 0,
    transformOrigin: "left bottom"
  });
  TweenMax.set(leaf_group_4, {
    y: 0,
    x: 0,
    rotation: 0,
    transformOrigin: "left bottom"
  });
  TweenMax.set(head, { y: 0 });
  TweenMax.set(face, { x: 0, y: 0 });
  TweenMax.set(leaf_stem_1, { attr: { x2: 289, y2: 360 } });
  TweenMax.set(leaf_stem_2, { attr: { x2: 287.2, y2: 287 } });
  TweenMax.set(leaf_stem_3, { attr: { x2: 313.3, y2: 278.1 } });
  TweenMax.set(leaf_stem_4, { attr: { x2: 312.6, y2: 351.2 } });
  TweenMax.set(leaf_1, { x: 0, y: 0 });
  TweenMax.set(leaf_2, { x: 0, y: 0 });
  TweenMax.set(leaf_3, { x: 0, y: 0 });
  TweenMax.set(leaf_4, { x: 0, y: 0 });
  TweenMax.set(stem_1, {
    attr: { d: "M300.8,398.4c0,0,2.1-60.3,1.7-80.3c-0.5-23-6.2-92-6.2-92" }
  });
}