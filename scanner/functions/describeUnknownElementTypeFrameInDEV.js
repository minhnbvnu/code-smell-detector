function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
              if (type == null) {
                return "";
              }
              if (typeof type === "function") {
                {
                  return describeNativeComponentFrame(type, shouldConstruct(type));
                }
              }
              if (typeof type === "string") {
                return describeBuiltInComponentFrame(type);
              }
              switch (type) {
                case REACT_SUSPENSE_TYPE:
                  return describeBuiltInComponentFrame("Suspense");
                case REACT_SUSPENSE_LIST_TYPE:
                  return describeBuiltInComponentFrame("SuspenseList");
              }
              if (typeof type === "object") {
                switch (type.$$typeof) {
                  case REACT_FORWARD_REF_TYPE:
                    return describeFunctionComponentFrame(type.render);
                  case REACT_MEMO_TYPE:
                    return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                  case REACT_LAZY_TYPE: {
                    var lazyComponent = type;
                    var payload = lazyComponent._payload;
                    var init = lazyComponent._init;
                    try {
                      return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                    } catch (x) {
                    }
                  }
                }
              }
              return "";
            }