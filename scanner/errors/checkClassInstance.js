function checkClassInstance(instance, ctor, newProps) {
              {
                var name = getComponentNameFromType(ctor) || "Component";
                var renderPresent = instance.render;
                if (!renderPresent) {
                  if (ctor.prototype && typeof ctor.prototype.render === "function") {
                    error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name);
                  } else {
                    error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name);
                  }
                }
                if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
                  error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name);
                }
                if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
                  error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name);
                }
                if (instance.propTypes) {
                  error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name);
                }
                if (instance.contextType) {
                  error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name);
                }
                {
                  if (instance.contextTypes) {
                    error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name);
                  }
                  if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
                    didWarnAboutContextTypeAndContextTypes.add(ctor);
                    error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name);
                  }
                }
                if (typeof instance.componentShouldUpdate === "function") {
                  error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name);
                }
                if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== "undefined") {
                  error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentNameFromType(ctor) || "A pure component");
                }
                if (typeof instance.componentDidUnmount === "function") {
                  error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name);
                }
                if (typeof instance.componentDidReceiveProps === "function") {
                  error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name);
                }
                if (typeof instance.componentWillRecieveProps === "function") {
                  error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name);
                }
                if (typeof instance.UNSAFE_componentWillRecieveProps === "function") {
                  error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
                }
                var hasMutatedProps = instance.props !== newProps;
                if (instance.props !== void 0 && hasMutatedProps) {
                  error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name);
                }
                if (instance.defaultProps) {
                  error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name);
                }
                if (typeof instance.getSnapshotBeforeUpdate === "function" && typeof instance.componentDidUpdate !== "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
                  didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
                  error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentNameFromType(ctor));
                }
                if (typeof instance.getDerivedStateFromProps === "function") {
                  error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
                }
                if (typeof instance.getDerivedStateFromError === "function") {
                  error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
                }
                if (typeof ctor.getSnapshotBeforeUpdate === "function") {
                  error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
                }
                var _state = instance.state;
                if (_state && (typeof _state !== "object" || isArray(_state))) {
                  error("%s.state: must be set to an object or null", name);
                }
                if (typeof instance.getChildContext === "function" && typeof ctor.childContextTypes !== "object") {
                  error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
                }
              }
            }