function validateProperties$2(type, props, eventRegistry) {
              if (isCustomComponent(type, props)) {
                return;
              }
              warnUnknownProperties(type, props, eventRegistry);
            }