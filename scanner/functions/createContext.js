function createContext(defaultValue) {
              var context = {
                $$typeof: REACT_CONTEXT_TYPE,
                // As a workaround to support multiple concurrent renderers, we categorize
                // some renderers as primary and others as secondary. We only expect
                // there to be two concurrent renderers at most: React Native (primary) and
                // Fabric (secondary); React DOM (primary) and React ART (secondary).
                // Secondary renderers store their context values on separate fields.
                _currentValue: defaultValue,
                _currentValue2: defaultValue,
                // Used to track how many concurrent renderers this context currently
                // supports within in a single renderer. Such as parallel server rendering.
                _threadCount: 0,
                // These are circular
                Provider: null,
                Consumer: null,
                // Add these to use same hidden class in VM as ServerContext
                _defaultValue: null,
                _globalName: null
              };
              context.Provider = {
                $$typeof: REACT_PROVIDER_TYPE,
                _context: context
              };
              var hasWarnedAboutUsingNestedContextConsumers = false;
              var hasWarnedAboutUsingConsumerProvider = false;
              var hasWarnedAboutDisplayNameOnConsumer = false;
              {
                var Consumer = {
                  $$typeof: REACT_CONTEXT_TYPE,
                  _context: context
                };
                Object.defineProperties(Consumer, {
                  Provider: {
                    get: function() {
                      if (!hasWarnedAboutUsingConsumerProvider) {
                        hasWarnedAboutUsingConsumerProvider = true;
                        error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                      }
                      return context.Provider;
                    },
                    set: function(_Provider) {
                      context.Provider = _Provider;
                    }
                  },
                  _currentValue: {
                    get: function() {
                      return context._currentValue;
                    },
                    set: function(_currentValue) {
                      context._currentValue = _currentValue;
                    }
                  },
                  _currentValue2: {
                    get: function() {
                      return context._currentValue2;
                    },
                    set: function(_currentValue2) {
                      context._currentValue2 = _currentValue2;
                    }
                  },
                  _threadCount: {
                    get: function() {
                      return context._threadCount;
                    },
                    set: function(_threadCount) {
                      context._threadCount = _threadCount;
                    }
                  },
                  Consumer: {
                    get: function() {
                      if (!hasWarnedAboutUsingNestedContextConsumers) {
                        hasWarnedAboutUsingNestedContextConsumers = true;
                        error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                      }
                      return context.Consumer;
                    }
                  },
                  displayName: {
                    get: function() {
                      return context.displayName;
                    },
                    set: function(displayName) {
                      if (!hasWarnedAboutDisplayNameOnConsumer) {
                        warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                        hasWarnedAboutDisplayNameOnConsumer = true;
                      }
                    }
                  }
                });
                context.Consumer = Consumer;
              }
              {
                context._currentRenderer = null;
                context._currentRenderer2 = null;
              }
              return context;
            }