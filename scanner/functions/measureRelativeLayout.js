async function measureRelativeLayout(component) {
  const { mmContext, parentScaleHint } = component.props;
  const { scene, provider } = mmContext;

  let layouts = await Promise.all([
    component.measure(),
    (scene || provider).measure()
  ]);

  // If the component is outside the scene, then perform one more attempt
  // to measure the scene. This fixes an issue with react-navigation
  // which moves content out of the view-port when it is not visible
  if (
    layouts[0].x + layouts[0].width < layouts[1].x ||
    layouts[0].y + layouts[0].height < layouts[1].y ||
    layouts[0].x > layouts[1].x + layouts[1].width ||
    layouts[0].y > layouts[1].y + layouts[1].height
  ) {
    layouts[1] = await (scene || provider).measure(true);
  }

  if (parentScaleHint !== undefined) {
    const scaleX =
      typeof parentScaleHint === "number" ? parentScaleHint : parentScaleHint.x;
    const scaleY =
      typeof parentScaleHint === "number" ? parentScaleHint : parentScaleHint.y;
    return {
      x:
        layouts[0].x -
        layouts[1].x +
        (layouts[0].width - layouts[0].width / scaleX) / 2,
      y:
        layouts[0].y -
        layouts[1].y +
        (layouts[0].height - layouts[0].height / scaleY) / 2,
      width: layouts[0].width / scaleX,
      height: layouts[0].height / scaleY,
      scaleX,
      scaleY
    };
  } else {
    return {
      x: layouts[0].x - layouts[1].x,
      y: layouts[0].y - layouts[1].y,
      width: layouts[0].width,
      height: layouts[0].height,
      scaleX: 1,
      scaleY: 1
    };
  }
}