function getSourceInfoErrorAddendumForProps(elementProps) {
              if (elementProps !== null && elementProps !== void 0) {
                return getSourceInfoErrorAddendum(elementProps.__source);
              }
              return "";
            }