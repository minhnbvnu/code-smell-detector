function createFactoryWithValidation(type) {
              var validatedFactory = createElementWithValidation.bind(null, type);
              validatedFactory.type = type;
              {
                if (!didWarnAboutDeprecatedCreateFactory) {
                  didWarnAboutDeprecatedCreateFactory = true;
                  warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
                }
                Object.defineProperty(validatedFactory, "type", {
                  enumerable: false,
                  get: function() {
                    warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                    Object.defineProperty(this, "type", {
                      value: type
                    });
                    return type;
                  }
                });
              }
              return validatedFactory;
            }