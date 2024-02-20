function forEachChildren(children, forEachFunc, forEachContext) {
              mapChildren(children, function() {
                forEachFunc.apply(this, arguments);
              }, forEachContext);
            }