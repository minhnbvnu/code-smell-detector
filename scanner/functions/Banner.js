function Banner(props) {
  const renderButton = ({ onPress, source, style }, key) => (
    <Button
      key={key}
      onPress={onPress}
      imageStyle={[styles.button, style]}
      source={source}
      style={{ marginLeft: 8, width: 90, flex: undefined }}
    />
  );

  const { animatedValue, style } = props;
  const { window: { width } } = useDimensions()
  return (
    <Animated.View style={[styles.container, { minWidth: width, maxWidth: width }, style]}>
      <Animated.View
        style={[
          styles.banner,
          {
            transform: [{ translateX: animatedValue }],
          },
        ]}
      >
        <Text style={styles.text} numberOfLines={2}>
          {props.title}
        </Text>
        {props.button && renderButton(props.button, 0)}
      </Animated.View>
    </Animated.View>
  );

}