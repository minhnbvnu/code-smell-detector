function render(
  width,
  height,
  pixelRatio,
  sourceResolution,
  sourceExtent,
  targetResolution,
  targetExtent,
  triangulation,
  sources,
  gutter,
  renderEdges,
  interpolate,
  drawSingle,
) {
  const context = createCanvasContext2D(
    Math.round(pixelRatio * width),
    Math.round(pixelRatio * height),
    canvasPool,
  );

  if (!interpolate) {
    context.imageSmoothingEnabled = false;
  }

  if (sources.length === 0) {
    return context.canvas;
  }

  context.scale(pixelRatio, pixelRatio);

  function pixelRound(value) {
    return Math.round(value * pixelRatio) / pixelRatio;
  }

  context.globalCompositeOperation = 'lighter';

  const sourceDataExtent = createEmpty();
  sources.forEach(function (src, i, arr) {
    extend(sourceDataExtent, src.extent);
  });

  let stitchContext;
  const stitchScale = pixelRatio / sourceResolution;
  // Round up Float32 scale values to prevent interpolation in Firefox.
  const inverseScale = (interpolate ? 1 : 1 + Math.pow(2, -24)) / stitchScale;

  if (!drawSingle || sources.length !== 1 || gutter !== 0) {
    stitchContext = createCanvasContext2D(
      Math.round(getWidth(sourceDataExtent) * stitchScale),
      Math.round(getHeight(sourceDataExtent) * stitchScale),
      canvasPool,
    );

    if (!interpolate) {
      stitchContext.imageSmoothingEnabled = false;
    }

    sources.forEach(function (src, i, arr) {
      const xPos = (src.extent[0] - sourceDataExtent[0]) * stitchScale;
      const yPos = -(src.extent[3] - sourceDataExtent[3]) * stitchScale;
      const srcWidth = getWidth(src.extent) * stitchScale;
      const srcHeight = getHeight(src.extent) * stitchScale;

      // This test should never fail -- but it does. Need to find a fix the upstream condition
      if (src.image.width > 0 && src.image.height > 0) {
        stitchContext.drawImage(
          src.image,
          gutter,
          gutter,
          src.image.width - 2 * gutter,
          src.image.height - 2 * gutter,
          interpolate ? xPos : Math.round(xPos),
          interpolate ? yPos : Math.round(yPos),
          interpolate
            ? srcWidth
            : Math.round(xPos + srcWidth) - Math.round(xPos),
          interpolate
            ? srcHeight
            : Math.round(yPos + srcHeight) - Math.round(yPos),
        );
      }
    });
  }
  const targetTopLeft = getTopLeft(targetExtent);

  triangulation.getTriangles().forEach(function (triangle, i, arr) {
    /* Calculate affine transform (src -> dst)
     * Resulting matrix can be used to transform coordinate
     * from `sourceProjection` to destination pixels.
     *
     * To optimize number of context calls and increase numerical stability,
     * we also do the following operations:
     * trans(-topLeftExtentCorner), scale(1 / targetResolution), scale(1, -1)
     * here before solving the linear system so [ui, vi] are pixel coordinates.
     *
     * Src points: xi, yi
     * Dst points: ui, vi
     * Affine coefficients: aij
     *
     * | x0 y0 1  0  0 0 |   |a00|   |u0|
     * | x1 y1 1  0  0 0 |   |a01|   |u1|
     * | x2 y2 1  0  0 0 | x |a02| = |u2|
     * |  0  0 0 x0 y0 1 |   |a10|   |v0|
     * |  0  0 0 x1 y1 1 |   |a11|   |v1|
     * |  0  0 0 x2 y2 1 |   |a12|   |v2|
     */
    const source = triangle.source;
    const target = triangle.target;
    let x0 = source[0][0],
      y0 = source[0][1];
    let x1 = source[1][0],
      y1 = source[1][1];
    let x2 = source[2][0],
      y2 = source[2][1];
    // Make sure that everything is on pixel boundaries
    const u0 = pixelRound((target[0][0] - targetTopLeft[0]) / targetResolution);
    const v0 = pixelRound(
      -(target[0][1] - targetTopLeft[1]) / targetResolution,
    );
    const u1 = pixelRound((target[1][0] - targetTopLeft[0]) / targetResolution);
    const v1 = pixelRound(
      -(target[1][1] - targetTopLeft[1]) / targetResolution,
    );
    const u2 = pixelRound((target[2][0] - targetTopLeft[0]) / targetResolution);
    const v2 = pixelRound(
      -(target[2][1] - targetTopLeft[1]) / targetResolution,
    );

    // Shift all the source points to improve numerical stability
    // of all the subsequent calculations. The [x0, y0] is used here.
    // This is also used to simplify the linear system.
    const sourceNumericalShiftX = x0;
    const sourceNumericalShiftY = y0;
    x0 = 0;
    y0 = 0;
    x1 -= sourceNumericalShiftX;
    y1 -= sourceNumericalShiftY;
    x2 -= sourceNumericalShiftX;
    y2 -= sourceNumericalShiftY;

    const augmentedMatrix = [
      [x1, y1, 0, 0, u1 - u0],
      [x2, y2, 0, 0, u2 - u0],
      [0, 0, x1, y1, v1 - v0],
      [0, 0, x2, y2, v2 - v0],
    ];
    const affineCoefs = solveLinearSystem(augmentedMatrix);
    if (!affineCoefs) {
      return;
    }

    context.save();
    context.beginPath();

    if (isBrokenDiagonalRendering() || !interpolate) {
      // Make sure that all lines are horizontal or vertical
      context.moveTo(u1, v1);
      // This is the diagonal line. Do it in 4 steps
      const steps = 4;
      const ud = u0 - u1;
      const vd = v0 - v1;
      for (let step = 0; step < steps; step++) {
        // Go horizontally
        context.lineTo(
          u1 + pixelRound(((step + 1) * ud) / steps),
          v1 + pixelRound((step * vd) / (steps - 1)),
        );
        // Go vertically
        if (step != steps - 1) {
          context.lineTo(
            u1 + pixelRound(((step + 1) * ud) / steps),
            v1 + pixelRound(((step + 1) * vd) / (steps - 1)),
          );
        }
      }
      // We are almost at u0r, v0r
      context.lineTo(u2, v2);
    } else {
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
    }

    context.clip();

    context.transform(
      affineCoefs[0],
      affineCoefs[2],
      affineCoefs[1],
      affineCoefs[3],
      u0,
      v0,
    );

    context.translate(
      sourceDataExtent[0] - sourceNumericalShiftX,
      sourceDataExtent[3] - sourceNumericalShiftY,
    );

    let image;
    if (stitchContext) {
      image = stitchContext.canvas;
      context.scale(inverseScale, -inverseScale);
    } else {
      const source = sources[0];
      const extent = source.extent;
      image = source.image;
      context.scale(
        getWidth(extent) / image.width,
        -getHeight(extent) / image.height,
      );
    }

    context.drawImage(image, 0, 0);
    context.restore();
  });

  if (stitchContext) {
    releaseCanvas(stitchContext);
    canvasPool.push(stitchContext.canvas);
  }

  if (renderEdges) {
    context.save();

    context.globalCompositeOperation = 'source-over';
    context.strokeStyle = 'black';
    context.lineWidth = 1;

    triangulation.getTriangles().forEach(function (triangle, i, arr) {
      const target = triangle.target;
      const u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
      const v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
      const u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
      const v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
      const u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
      const v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;

      context.beginPath();
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
      context.closePath();
      context.stroke();
    });

    context.restore();
  }
  return context.canvas;
}