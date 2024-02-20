function Pressable({ children, style, activeOpacity, ...otherProps }) {
  const _style = useCallback(
    ({ pressed }) => [{ opacity: pressed ? activeOpacity : 1 }, style && style],
    [style]
  );

  return (
    <RNPressable style={_style} {...otherProps}>
      {children}
    </RNPressable>
  );
}