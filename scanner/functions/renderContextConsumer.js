function renderContextConsumer(request, task, context, props) {
              {
                if (context._context === void 0) {
                  if (context !== context.Consumer) {
                    if (!hasWarnedAboutUsingContextAsConsumer) {
                      hasWarnedAboutUsingContextAsConsumer = true;
                      error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                  }
                } else {
                  context = context._context;
                }
              }
              var render = props.children;
              {
                if (typeof render !== "function") {
                  error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
                }
              }
              var newValue = readContext(context);
              var newChildren = render(newValue);
              renderNodeDestructive(request, task, newChildren);
            }