function ChartLabelFactory(style) {
  return function ChartLabel({ format, ...props }) {
    const { [style]: val = 0 } = useContext(ChartContext);
    const formattedValue = useDerivedValue(() => {
      return format ? format(val.value) : val.value;
    }, []);
    const textProps = useAnimatedStyle(() => {
      return {
        text: formattedValue.value,
      };
    }, []);
    return (
      <AnimatedTextInput
        {...props}
        animatedProps={textProps}
        defaultValue={format ? format(val.value) : val.value}
        editable={false}
      />
    );
  };
}