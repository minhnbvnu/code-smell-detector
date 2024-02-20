function maskContext(type, context) {
            var contextTypes = type.contextTypes;
            if (!contextTypes) {
              return emptyObject;
            }
            var maskedContext = {};
            for (var contextName in contextTypes) {
              maskedContext[contextName] = context[contextName];
            }
            return maskedContext;
          }