function applyDerivedStateFromProps(instance, ctor, getDerivedStateFromProps, prevState, nextProps) {
              var partialState = getDerivedStateFromProps(nextProps, prevState);
              {
                warnOnUndefinedDerivedState(ctor, partialState);
              }
              var newState = partialState === null || partialState === void 0 ? prevState : assign({}, prevState, partialState);
              return newState;
            }