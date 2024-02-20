function createMagicMoveComponent(Component, props) {
  let { AnimatedComponent, ComponentType, ...otherProps } = props || {};
  AnimatedComponent =
    AnimatedComponent || Animated.createAnimatedComponent(Component);
  ComponentType = ComponentType || "view";
  const magicMoveComponent = props => {
    return (
      <MagicMoveView
        Component={Component}
        AnimatedComponent={AnimatedComponent}
        ComponentType={ComponentType}
        {...otherProps}
        {...props}
      />
    );
  };
  return magicMoveComponent;
}