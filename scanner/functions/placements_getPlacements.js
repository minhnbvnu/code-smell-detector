function placements_getPlacements() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _config$arrowWidth = config.arrowWidth,
    arrowWidth = _config$arrowWidth === void 0 ? 5 : _config$arrowWidth,
    _config$horizontalArr = config.horizontalArrowShift,
    horizontalArrowShift = _config$horizontalArr === void 0 ? 16 : _config$horizontalArr,
    _config$verticalArrow = config.verticalArrowShift,
    verticalArrowShift = _config$verticalArrow === void 0 ? 12 : _config$verticalArrow,
    _config$autoAdjustOve = config.autoAdjustOverflow,
    autoAdjustOverflow = _config$autoAdjustOve === void 0 ? true : _config$autoAdjustOve;
  var placementMap = {
    left: {
      points: ['cr', 'cl'],
      offset: [-4, 0]
    },
    right: {
      points: ['cl', 'cr'],
      offset: [4, 0]
    },
    top: {
      points: ['bc', 'tc'],
      offset: [0, -4]
    },
    bottom: {
      points: ['tc', 'bc'],
      offset: [0, 4]
    },
    topLeft: {
      points: ['bl', 'tc'],
      offset: [-(horizontalArrowShift + arrowWidth), -4]
    },
    leftTop: {
      points: ['tr', 'cl'],
      offset: [-4, -(verticalArrowShift + arrowWidth)]
    },
    topRight: {
      points: ['br', 'tc'],
      offset: [horizontalArrowShift + arrowWidth, -4]
    },
    rightTop: {
      points: ['tl', 'cr'],
      offset: [4, -(verticalArrowShift + arrowWidth)]
    },
    bottomRight: {
      points: ['tr', 'bc'],
      offset: [horizontalArrowShift + arrowWidth, 4]
    },
    rightBottom: {
      points: ['bl', 'cr'],
      offset: [4, verticalArrowShift + arrowWidth]
    },
    bottomLeft: {
      points: ['tl', 'bc'],
      offset: [-(horizontalArrowShift + arrowWidth), 4]
    },
    leftBottom: {
      points: ['br', 'cl'],
      offset: [-4, verticalArrowShift + arrowWidth]
    }
  };
  Object.keys(placementMap).forEach(function (key) {
    placementMap[key] = config.arrowPointAtCenter ? placements_extends(placements_extends({}, placementMap[key]), {
      overflow: getOverflowOptions(autoAdjustOverflow),
      targetOffset: placements_targetOffset
    }) : placements_extends(placements_extends({}, placements[key]), {
      overflow: getOverflowOptions(autoAdjustOverflow)
    });
    placementMap[key].ignoreShake = true;
  });
  return placementMap;
}