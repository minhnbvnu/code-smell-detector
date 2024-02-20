function SvgComponent() {
  const {
    style,
    animatedStyle,
    height,
    width,
    animatedProps,
    props,
    onLongPressGestureEvent,
    gestureEnabled,
    longPressGestureHandlerProps,
  } = useContext(InternalContext);
  return (
    <LongPressGestureHandler
      enabled={gestureEnabled}
      maxDist={100000}
      minDurationMs={0}
      shouldCancelWhenOutside={false}
      {...longPressGestureHandlerProps}
      {...{ onGestureEvent: onLongPressGestureEvent }}
    >
      <Animated.View>
        <Svg
          height={height + 20} // temporary fix for clipped chart
          viewBox={`0 0 ${width} ${height}`}
          width={width}
        >
          <AnimatedPath
            animatedProps={animatedProps}
            {...props}
            style={[style, animatedStyle]}
          />
        </Svg>
      </Animated.View>
    </LongPressGestureHandler>
  );
}