function RenderBadge({
  rtl,
  label,
  props,
  value,
  textStyle,
  badgeStyle,
  badgeTextStyle,
  badgeDotStyle,
  getBadgeColor,
  getBadgeDotColor,
  showBadgeDot,
  onPress,
  THEME,
}) {
  /**
   * onPress.
   */
  const __onPress = useCallback(() => onPress(value), [onPress, value]);

  /**
   * The badge style.
   * @returns {object}
   */
  const _badgeStyle = useMemo(
    () => [
      RTL_DIRECTION(rtl, THEME.badgeStyle),
      ...[badgeStyle].flat(),
      {
        backgroundColor: getBadgeColor(value),
      },
    ],
    [THEME, rtl, badgeStyle, getBadgeColor],
  );

  /**
   * The badge dot style.
   * @returns {object}
   */
  const _badgeDotStyle = useMemo(
    () => [
      RTL_STYLE(rtl, THEME.badgeDotStyle),
      ...[badgeDotStyle].flat(),
      {
        backgroundColor: getBadgeDotColor(value),
      },
    ],
    [THEME, rtl, badgeDotStyle, getBadgeDotColor],
  );

  /**
   * The badge text style.
   * @returns {object}
   */
  const _badgeTextStyle = useMemo(
    () => [...[textStyle].flat(), ...[badgeTextStyle].flat()],
    [textStyle, badgeTextStyle],
  );

  return (
    <TouchableOpacity style={_badgeStyle} {...props} onPress={__onPress}>
      {showBadgeDot && <View style={_badgeDotStyle} />}
      <Text style={_badgeTextStyle}>{label}</Text>
    </TouchableOpacity>
  );
}