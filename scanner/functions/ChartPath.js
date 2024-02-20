function ChartPath({
  smoothingWhileTransitioningEnabled,
  height,
  width,
  longPressGestureHandlerProps,
  selectedStrokeWidth = 1,
  strokeWidth = 1,
  gestureEnabled = true,
  selectedOpacity = 0.7,
  style,
  onLongPressGestureEvent,
  prevData,
  currData,
  smoothingStrategy,
  prevSmoothing,
  currSmoothing,
  pathOpacity,
  progress,
  layoutSize,
  __disableRendering,
  children,
  ...props
}) {
  const smoothingWhileTransitioningEnabledValue = useSharedValue(
    smoothingWhileTransitioningEnabled
  );
  const selectedStrokeWidthValue = useSharedValue(selectedStrokeWidth);
  const strokeWidthValue = useSharedValue(strokeWidth);

  useEffect(() => {
    layoutSize.value = { height, width };
  }, [height, layoutSize, width]);

  const path = useDerivedValue(() => {
    let fromValue = prevData.value;
    let toValue = currData.value;
    let res;
    let smoothing = 0;
    const strategy = smoothingStrategy.value;
    if (progress.value !== 1) {
      const numOfPoints = Math.round(
        fromValue.length +
          (toValue.length - fromValue.length) *
            Math.min(progress.value, 0.5) *
            2
      );
      if (fromValue.length !== numOfPoints) {
        const mappedFrom = [];
        const coef = (fromValue.length - 1) / (numOfPoints - 1);
        for (let i = 0; i < numOfPoints; i++) {
          mappedFrom.push(fromValue[Math.round(i * coef)]);
        }
        fromValue = mappedFrom;
      }

      if (toValue.length !== numOfPoints) {
        const mappedTo = [];
        const coef = (toValue.length - 1) / (numOfPoints - 1);

        for (let i = 0; i < numOfPoints; i++) {
          mappedTo.push(toValue[Math.round(i * coef)]);
        }
        toValue = mappedTo;
      }

      if (!smoothingWhileTransitioningEnabledValue.value) {
        if (prevSmoothing.value > currSmoothing.value) {
          smoothing =
            prevSmoothing.value +
            Math.min(progress.value * 5, 1) *
              (currSmoothing.value - prevSmoothing.value);
        } else {
          smoothing =
            prevSmoothing.value +
            Math.max(Math.min((progress.value - 0.7) * 4, 1), 0) *
              (currSmoothing.value - prevSmoothing.value);
        }
      }

      res = fromValue.map(({ x, y }, i) => {
        const { x: nX, y: nY } = toValue[i];
        const mX = (x + (nX - x) * progress.value) * layoutSize.value.width;
        const mY = (y + (nY - y) * progress.value) * layoutSize.value.height;
        return { x: mX, y: mY };
      });
    } else {
      smoothing = currSmoothing.value;
      res = toValue.map(({ x, y }) => {
        return {
          x: x * layoutSize.value.width,
          y: y * layoutSize.value.height,
        };
      });
    }

    // For som reason isNaN(y) does not work
    res = res.filter(({ y }) => y === Number(y));

    if (res.length !== 0) {
      const firstValue = res[0];
      const lastValue = res[res.length - 1];
      if (firstValue.x === 0 && strategy !== 'bezier') {
        // extrapolate the first points
        res = [
          { x: res[0].x, y: res[0].y },
          { x: -res[4].x, y: res[0].y },
        ].concat(res);
      }
      if (lastValue.x === layoutSize.value.width && strategy !== 'bezier') {
        // extrapolate the last points
        res[res.length - 1].x = lastValue.x + 20;
        if (res.length > 2) {
          res[res.length - 2].x = res[res.length - 2].x + 10;
        }
      }
    }

    if (
      (smoothing !== 0 && (strategy === 'complex' || strategy === 'simple')) ||
      (strategy === 'bezier' &&
        (!smoothingWhileTransitioningEnabledValue.value ||
          progress.value === 1))
    ) {
      return svgBezierPath(res, smoothing, strategy);
    }

    return res
      .map(({ x, y }) => {
        return `L ${x} ${y}`;
      })
      .join(' ')
      .replace('L', 'M');
  });

  const animatedProps = useAnimatedStyle(() => {
    const props = {
      d: path.value,
      strokeWidth:
        pathOpacity.value *
          (Number(strokeWidthValue.value) -
            Number(selectedStrokeWidthValue.value)) +
        Number(selectedStrokeWidthValue.value),
    };
    if (Platform.OS === 'ios') {
      props.style = {
        opacity: pathOpacity.value * (1 - selectedOpacity) + selectedOpacity,
      };
    }
    return props;
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: pathOpacity.value * (1 - selectedOpacity) + selectedOpacity,
    };
  }, undefined);

  return (
    <InternalContext.Provider
      value={{
        animatedProps,
        animatedStyle,
        gestureEnabled,
        height,
        longPressGestureHandlerProps,
        onLongPressGestureEvent,
        props,
        style,
        width,
      }}
    >
      {__disableRendering ? children : <SvgComponent />}
    </InternalContext.Provider>
  );
}