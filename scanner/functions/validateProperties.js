function validateProperties(type, props) {
              if (isCustomComponent(type, props)) {
                return;
              }
              warnInvalidARIAProps(type, props);
            }