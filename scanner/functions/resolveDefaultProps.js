function resolveDefaultProps(Component, baseProps) {
              if (Component && Component.defaultProps) {
                var props = assign({}, baseProps);
                var defaultProps = Component.defaultProps;
                for (var propName in defaultProps) {
                  if (props[propName] === void 0) {
                    props[propName] = defaultProps[propName];
                  }
                }
                return props;
              }
              return baseProps;
            }