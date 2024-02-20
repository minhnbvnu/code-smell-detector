function cloneElement(element, config, children) {
              if (element === null || element === void 0) {
                throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
              }
              var propName;
              var props = assign({}, element.props);
              var key = element.key;
              var ref = element.ref;
              var self = element._self;
              var source = element._source;
              var owner = element._owner;
              if (config != null) {
                if (hasValidRef(config)) {
                  ref = config.ref;
                  owner = ReactCurrentOwner.current;
                }
                if (hasValidKey(config)) {
                  {
                    checkKeyStringCoercion(config.key);
                  }
                  key = "" + config.key;
                }
                var defaultProps;
                if (element.type && element.type.defaultProps) {
                  defaultProps = element.type.defaultProps;
                }
                for (propName in config) {
                  if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                    if (config[propName] === void 0 && defaultProps !== void 0) {
                      props[propName] = defaultProps[propName];
                    } else {
                      props[propName] = config[propName];
                    }
                  }
                }
              }
              var childrenLength = arguments.length - 2;
              if (childrenLength === 1) {
                props.children = children;
              } else if (childrenLength > 1) {
                var childArray = Array(childrenLength);
                for (var i = 0; i < childrenLength; i++) {
                  childArray[i] = arguments[i + 2];
                }
                props.children = childArray;
              }
              return ReactElement(element.type, key, ref, self, source, owner, props);
            }