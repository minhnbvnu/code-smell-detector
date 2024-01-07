function iconStyleParser(node, objectStack) {
  // FIXME refreshMode
  // FIXME refreshInterval
  // FIXME viewRefreshTime
  // FIXME viewBoundScale
  // FIXME viewFormat
  // FIXME httpQuery
  const object = pushParseAndPop({}, ICON_STYLE_PARSERS, node, objectStack);
  if (!object) {
    return;
  }
  const styleObject = /** @type {Object} */ (
    objectStack[objectStack.length - 1]
  );
  const IconObject = 'Icon' in object ? object['Icon'] : {};
  const drawIcon = !('Icon' in object) || Object.keys(IconObject).length > 0;
  let src;
  const href = /** @type {string|undefined} */ (IconObject['href']);
  if (href) {
    src = href;
  } else if (drawIcon) {
    src = DEFAULT_IMAGE_STYLE_SRC;
  }
  let anchor, anchorXUnits, anchorYUnits;
  /** @type {import('../style/Icon.js').IconOrigin|undefined} */
  let anchorOrigin = 'bottom-left';
  const hotSpot = /** @type {Vec2|undefined} */ (object['hotSpot']);
  if (hotSpot) {
    anchor = [hotSpot.x, hotSpot.y];
    anchorXUnits = hotSpot.xunits;
    anchorYUnits = hotSpot.yunits;
    anchorOrigin = hotSpot.origin;
  } else if (/^https?:\/\/maps\.(?:google|gstatic)\.com\//.test(src)) {
    // Google hotspots from https://kml4earth.appspot.com/icons.html#notes
    if (src.includes('pushpin')) {
      anchor = DEFAULT_IMAGE_STYLE_ANCHOR;
      anchorXUnits = DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS;
      anchorYUnits = DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS;
    } else if (src.includes('arrow-reverse')) {
      anchor = [54, 42];
      anchorXUnits = DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS;
      anchorYUnits = DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS;
    } else if (src.includes('paddle')) {
      anchor = [32, 1];
      anchorXUnits = DEFAULT_IMAGE_STYLE_ANCHOR_X_UNITS;
      anchorYUnits = DEFAULT_IMAGE_STYLE_ANCHOR_Y_UNITS;
    }
  }

  let offset;
  const x = /** @type {number|undefined} */ (IconObject['x']);
  const y = /** @type {number|undefined} */ (IconObject['y']);
  if (x !== undefined && y !== undefined) {
    offset = [x, y];
  }

  let size;
  const w = /** @type {number|undefined} */ (IconObject['w']);
  const h = /** @type {number|undefined} */ (IconObject['h']);
  if (w !== undefined && h !== undefined) {
    size = [w, h];
  }

  let rotation;
  const heading = /** @type {number} */ (object['heading']);
  if (heading !== undefined) {
    rotation = toRadians(heading);
  }

  const scale = /** @type {number|undefined} */ (object['scale']);

  const color = /** @type {Array<number>|undefined} */ (object['color']);

  if (drawIcon) {
    if (src == DEFAULT_IMAGE_STYLE_SRC) {
      size = DEFAULT_IMAGE_STYLE_SIZE;
    }

    const imageStyle = new Icon({
      anchor: anchor,
      anchorOrigin: anchorOrigin,
      anchorXUnits: anchorXUnits,
      anchorYUnits: anchorYUnits,
      crossOrigin: this.crossOrigin_,
      offset: offset,
      offsetOrigin: 'bottom-left',
      rotation: rotation,
      scale: scale,
      size: size,
      src: this.iconUrlFunction_(src),
      color: color,
    });

    const imageScale = imageStyle.getScaleArray()[0];
    const imageSize = imageStyle.getSize();
    if (imageSize === null) {
      const imageState = imageStyle.getImageState();
      if (imageState === ImageState.IDLE || imageState === ImageState.LOADING) {
        const listener = function () {
          const imageState = imageStyle.getImageState();
          if (
            !(
              imageState === ImageState.IDLE ||
              imageState === ImageState.LOADING
            )
          ) {
            const imageSize = imageStyle.getSize();
            if (imageSize && imageSize.length == 2) {
              const resizeScale = scaleForSize(imageSize);
              imageStyle.setScale(imageScale * resizeScale);
            }
            imageStyle.unlistenImageChange(listener);
          }
        };
        imageStyle.listenImageChange(listener);
        if (imageState === ImageState.IDLE) {
          imageStyle.load();
        }
      }
    } else if (imageSize.length == 2) {
      const resizeScale = scaleForSize(imageSize);
      imageStyle.setScale(imageScale * resizeScale);
    }
    styleObject['imageStyle'] = imageStyle;
  } else {
    // handle the case when we explicitly want to draw no icon.
    styleObject['imageStyle'] = DEFAULT_NO_IMAGE_STYLE;
  }
}