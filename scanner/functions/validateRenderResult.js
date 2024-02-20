function validateRenderResult(child, type) {
            if (child === void 0) {
              {
                {
                  throw Error((getComponentName(type) || "Component") + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.");
                }
              }
            }
          }