constructor(options) {
    options = options ? options : {radius: 5};

    super({
      points: Infinity,
      fill: options.fill,
      radius: options.radius,
      stroke: options.stroke,
      scale: options.scale !== undefined ? options.scale : 1,
      rotation: options.rotation !== undefined ? options.rotation : 0,
      rotateWithView:
        options.rotateWithView !== undefined ? options.rotateWithView : false,
      displacement:
        options.displacement !== undefined ? options.displacement : [0, 0],
      declutterMode: options.declutterMode,
    });
  }